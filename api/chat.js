const fs = require("node:fs");
const path = require("node:path");

const MAX_MESSAGE_CHARS = 1000;
const DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMENSIONS = 1536;
const DEFAULT_MATCH_COUNT = 10;
const MAX_MATCH_COUNT = 12;
const DEFAULT_SIMILARITY_THRESHOLD = 0.35;
const OPENAI_EMBEDDINGS_URL = "https://api.openai.com/v1/embeddings";
const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const DEFAULT_CHAT_MODEL = "gpt-5-mini";
const MAX_CONTEXT_CHARS = 12000;
const MAX_ANSWER_TOKENS = 2500;
const MAX_ANSWER_CHARS = 500;
const MAX_ANSWER_SENTENCES = 2;
const MAX_ANSWER_BULLETS = 4;
const FALLBACK_ANSWER =
  "I don't have enough information about that from Ousama's portfolio content.";
const GREETING_ANSWER =
  "Hi, I'm Ousama's portfolio assistant. Ask me about his projects, experience, skills, or technical background.";
const GOODBYE_ANSWER =
  "Thanks for chatting. Feel free to come back if you want to ask more about Ousama's work or projects.";

function loadLocalEnv() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envText = fs.readFileSync(envPath, "utf8");

  for (const line of envText.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function requireEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    const error = new Error(`Missing required environment variable: ${name}`);
    error.statusCode = 500;
    throw error;
  }

  return value;
}

function getEmbeddingModel() {
  return process.env.OPENAI_EMBEDDING_MODEL?.trim() || DEFAULT_EMBEDDING_MODEL;
}

function getChatModel() {
  return process.env.OPENAI_CHAT_MODEL?.trim() || DEFAULT_CHAT_MODEL;
}

function assertEmbeddingModel(model) {
  if (model !== DEFAULT_EMBEDDING_MODEL) {
    const error = new Error(
      `OPENAI_EMBEDDING_MODEL must be ${DEFAULT_EMBEDDING_MODEL} because portfolio_chunks.embedding is vector(${EMBEDDING_DIMENSIONS}).`,
    );
    error.statusCode = 500;
    throw error;
  }
}

function normalizeSmallTalkText(message) {
  return message
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getSmallTalkAnswer(message) {
  const normalized = normalizeSmallTalkText(message);

  if (!normalized) {
    return null;
  }

  const greetingPatterns = [
    /^(hi|hello|hey|yo|good morning|good afternoon|good evening)$/,
    /^(hi|hello|hey|yo) there$/,
    /^(hi|hello|hey|yo) (ousama|assistant)$/,
    /^how are you$/,
    /^what's up$/,
  ];
  const goodbyePatterns = [
    /^(bye|goodbye|see you|see ya|later|thanks|thank you|thanks bye|thank you bye)$/,
    /^talk to you later$/,
    /^that is all$/,
    /^that's all$/,
  ];

  if (greetingPatterns.some((pattern) => pattern.test(normalized))) {
    return GREETING_ANSWER;
  }

  if (goodbyePatterns.some((pattern) => pattern.test(normalized))) {
    return GOODBYE_ANSWER;
  }

  return null;
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function readRawBody(req) {
  if (req.body && typeof req.body === "object") {
    return Promise.resolve(req.body);
  }

  if (typeof req.body === "string") {
    return Promise.resolve(req.body);
  }

  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      resolve(body);
    });

    req.on("error", reject);
  });
}

async function readJsonBody(req) {
  const rawBody = await readRawBody(req);

  if (!rawBody) {
    return {};
  }

  if (typeof rawBody === "object") {
    return rawBody;
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    const error = new Error("Request body must be valid JSON.");
    error.statusCode = 400;
    throw error;
  }
}

async function readErrorResponse(response) {
  const text = await response.text();

  try {
    const parsed = JSON.parse(text);
    return parsed.error?.message || parsed.message || text;
  } catch {
    return text;
  }
}

async function createQueryEmbedding(message) {
  const apiKey = requireEnv("OPENAI_API_KEY");
  const model = getEmbeddingModel();

  assertEmbeddingModel(model);

  const response = await fetch(OPENAI_EMBEDDINGS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      input: message,
    }),
  });

  if (!response.ok) {
    const error = new Error(`OpenAI embeddings request failed: ${await readErrorResponse(response)}`);
    error.statusCode = 502;
    throw error;
  }

  const data = await response.json();
  const embedding = data.data?.[0]?.embedding;

  if (!Array.isArray(embedding) || embedding.length !== EMBEDDING_DIMENSIONS) {
    const error = new Error(
      `Unexpected embedding dimension: expected ${EMBEDDING_DIMENSIONS}, received ${embedding?.length ?? "unknown"}.`,
    );
    error.statusCode = 502;
    throw error;
  }

  return embedding;
}

function buildRetrievalQuery(message) {
  const normalized = message.toLowerCase();
  const asksAboutOusama =
    /\b(who is|tell me about|about|bit about|background|bio|introduce)\b/.test(normalized) &&
    /\b(ousama|him|his)\b/.test(normalized);

  if (!asksAboutOusama) {
    return message;
  }

  return [
    message,
    "Ousama short bio education current focus career interests personality work style software engineering graduate Toronto Metropolitan University",
    "portfolio-knowledge/about-me.md",
  ].join("\n");
}

function getOpenAIHeaders() {
  return {
    Authorization: `Bearer ${requireEnv("OPENAI_API_KEY")}`,
    "Content-Type": "application/json",
  };
}

function getSupabaseRpcUrl() {
  const supabaseUrl = requireEnv("SUPABASE_URL").replace(/\/$/, "");
  return `${supabaseUrl}/rest/v1/rpc/match_portfolio_chunks`;
}

function getServiceRoleHeaders() {
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

function normalizeMatchCount(value) {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return DEFAULT_MATCH_COUNT;
  }

  return Math.min(Math.max(Math.trunc(numberValue), 1), MAX_MATCH_COUNT);
}

function normalizeSimilarityThreshold(value) {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return DEFAULT_SIMILARITY_THRESHOLD;
  }

  return Math.min(Math.max(numberValue, 0), 1);
}

async function matchPortfolioChunks({ queryEmbedding, matchCount, similarityThreshold }) {
  const response = await fetch(getSupabaseRpcUrl(), {
    method: "POST",
    headers: getServiceRoleHeaders(),
    body: JSON.stringify({
      query_embedding: queryEmbedding,
      match_count: matchCount,
      similarity_threshold: similarityThreshold,
    }),
  });

  if (!response.ok) {
    const error = new Error(`Supabase match_portfolio_chunks request failed: ${await readErrorResponse(response)}`);
    error.statusCode = 502;
    throw error;
  }

  return response.json();
}

function formatSources(matches) {
  return matches.map((match) => ({
    id: match.id,
    source_file: match.source_file,
    project_name: match.project_name,
    section_title: match.section_title,
    chunk_index: match.chunk_index,
    similarity: Number(match.similarity),
  }));
}

function formatMatches(matches) {
  return matches.map((match) => ({
    id: match.id,
    content: match.content,
    source_file: match.source_file,
    project_name: match.project_name,
    section_title: match.section_title,
    chunk_index: match.chunk_index,
    metadata: match.metadata || {},
    similarity: Number(match.similarity),
  }));
}

function buildContext(matches) {
  let context = "";

  for (const [index, match] of matches.entries()) {
    const label = [
      `Source ${index + 1}`,
      match.project_name ? `Project/Topic: ${match.project_name}` : null,
      `File: ${match.source_file}`,
      match.section_title ? `Section: ${match.section_title}` : null,
      `Chunk: ${match.chunk_index}`,
      `Similarity: ${Number(match.similarity).toFixed(3)}`,
    ]
      .filter(Boolean)
      .join("\n");

    const block = `${label}\nContent:\n${match.content}\n\n`;

    if (context.length + block.length > MAX_CONTEXT_CHARS) {
      break;
    }

    context += block;
  }

  return context.trim();
}

function extractResponseText(data) {
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const parts = [];

  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && typeof content.text === "string") {
        parts.push(content.text);
      }
    }
  }

  return parts.join("").trim();
}

function normalizeAnswer(answer) {
  return answer.replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n").trim();
}

function finishWithPunctuation(text) {
  if (!text) {
    return text;
  }

  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function shortenBulletedAnswer(answer) {
  const lines = answer.split("\n").map((line) => line.trim()).filter(Boolean);
  const bulletLines = lines.filter((line) => /^[-*]\s+/.test(line));

  if (bulletLines.length === 0) {
    return null;
  }

  const intro = /^[-*]\s+/.test(lines[0]) ? [] : [lines[0]];
  const bullets = bulletLines.slice(0, MAX_ANSWER_BULLETS).map(finishWithPunctuation);
  const shortened = [...intro, ...bullets].join("\n");

  if (shortened.length <= MAX_ANSWER_CHARS) {
    return shortened;
  }

  return bullets.slice(0, 3).join("\n");
}

function shortenParagraphAnswer(answer) {
  const sentenceMatches = answer.match(/[^.!?]+[.!?]+(?:\s|$)/g);

  if (sentenceMatches?.length) {
    let shortened = "";

    for (const sentence of sentenceMatches.slice(0, MAX_ANSWER_SENTENCES)) {
      const candidate = `${shortened}${sentence}`.trim();

      if (candidate.length > MAX_ANSWER_CHARS) {
        break;
      }

      shortened = candidate;
    }

    if (shortened) {
      return shortened;
    }
  }

  const clipped = answer.slice(0, MAX_ANSWER_CHARS);
  const lastSpace = clipped.lastIndexOf(" ");
  const safeClip = lastSpace > 120 ? clipped.slice(0, lastSpace) : clipped;

  return finishWithPunctuation(safeClip.trim());
}

function prepareFinalAnswer(answer) {
  const normalized = normalizeAnswer(answer);

  if (!normalized || normalized === FALLBACK_ANSWER) {
    return normalized || FALLBACK_ANSWER;
  }

  if (normalized.length <= MAX_ANSWER_CHARS && /[.!?]$/.test(normalized)) {
    return normalized;
  }

  return shortenBulletedAnswer(normalized) || shortenParagraphAnswer(normalized);
}

async function generateGroundedAnswer({ message, matches }) {
  if (!matches.length) {
    return FALLBACK_ANSWER;
  }

  const context = buildContext(matches);

  if (!context) {
    return FALLBACK_ANSWER;
  }

  const instructions = [
    "You are Ousama Alabdullah's portfolio assistant.",
    "Answer recruiter-style questions using only the provided portfolio context.",
    "Do not invent projects, tools, dates, employers, metrics, credentials, or personal details.",
    "If the context has directly relevant facts, answer briefly using those facts even if the context is not exhaustive.",
    "For broad bio or background questions, Short Bio, Summary, Education, Current Focus, Career Interests, and Work Style sections are enough context to answer.",
    `If the context has no directly relevant facts, reply exactly: "${FALLBACK_ANSWER}"`,
    "Use simple, plain language.",
    "Keep the answer short by default: 1-2 short sentences and under 70 words.",
    "Use bullets only when the user asks for a list or comparison, and then use at most 4 bullets.",
    "If the user asks a broad question, summarize instead of covering every detail.",
    "Avoid long explanations, corporate wording, and overly technical detail unless the user asks for detail.",
    "Always finish the final sentence cleanly.",
    "Prefer third person when the user asks about Ousama.",
    "You may compare projects or strengths only when the comparison is supported by the context.",
  ].join("\n");

  const input = [
    "Portfolio context:",
    context,
    "",
    "User question:",
    message,
  ].join("\n");

  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: getOpenAIHeaders(),
    body: JSON.stringify({
      model: getChatModel(),
      instructions,
      input,
      max_output_tokens: MAX_ANSWER_TOKENS,
      store: false,
    }),
  });

  if (!response.ok) {
    const error = new Error(`OpenAI response request failed: ${await readErrorResponse(response)}`);
    error.statusCode = 502;
    throw error;
  }

  const data = await response.json();
  const answer = extractResponseText(data);

  return prepareFinalAnswer(answer || FALLBACK_ANSWER);
}

loadLocalEnv();

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, {
      error: "Method not allowed. Use POST.",
    });
  }

  try {
    const body = await readJsonBody(req);
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return sendJson(res, 400, {
        error: "Missing required string field: message.",
      });
    }

    if (message.length > MAX_MESSAGE_CHARS) {
      return sendJson(res, 400, {
        error: `Message is too long. Maximum length is ${MAX_MESSAGE_CHARS} characters.`,
      });
    }

    const smallTalkAnswer = getSmallTalkAnswer(message);

    if (smallTalkAnswer) {
      return sendJson(res, 200, {
        answer: smallTalkAnswer,
        matches: [],
        sources: [],
      });
    }

    const matchCount = normalizeMatchCount(body.match_count ?? body.matchCount);
    const similarityThreshold = normalizeSimilarityThreshold(
      body.similarity_threshold ?? body.similarityThreshold,
    );
    const queryEmbedding = await createQueryEmbedding(buildRetrievalQuery(message));
    const matches = await matchPortfolioChunks({
      queryEmbedding,
      matchCount,
      similarityThreshold,
    });
    const formattedMatches = formatMatches(matches);
    const answer = await generateGroundedAnswer({
      message,
      matches: formattedMatches,
    });

    return sendJson(res, 200, {
      answer,
      matches: formattedMatches,
      sources: formatSources(formattedMatches),
    });
  } catch (error) {
    if (!error.statusCode) {
      console.error(error);
    }

    return sendJson(res, error.statusCode || 500, {
      error: error.statusCode ? error.message : "Unexpected server error.",
    });
  }
};
