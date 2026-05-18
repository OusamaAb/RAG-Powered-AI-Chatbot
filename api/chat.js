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
const MAX_FOLLOW_UP_QUESTIONS = 3;
const MAX_BODY_BYTES = 4096;
const DEFAULT_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const DEFAULT_RATE_LIMIT_MAX_REQUESTS = 8;
const DEFAULT_RATE_LIMIT_BLOCK_MS = 2 * 60 * 1000;
const STALE_IN_FLIGHT_MS = 45 * 1000;
const FALLBACK_ANSWER =
  "I don't have enough information about that from Ousama's portfolio content.";
const GREETING_ANSWER =
  "Hey, I'm Ousama's portfolio assistant. Ask me about his projects, experience, skills, or technical background.";
const GOODBYE_ANSWER =
  "Thanks for chatting. Come back anytime if you want to ask more about Ousama's work or projects.";
const SMALL_TALK_FOLLOW_UPS = [
  "Tell me a bit about Ousama.",
  "What projects has Ousama worked on?",
  "What does Ousama do for fun?",
];
const FALLBACK_FOLLOW_UPS = [
  "What projects has Ousama worked on?",
  "What technologies has Ousama used?",
  "Tell me about Ousama's background.",
];
const rateLimitBuckets = new Map();
const blockedClients = new Map();
const inFlightClients = new Map();

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

function getNumberEnv(name, fallbackValue) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallbackValue;
}

function getBooleanEnv(name, fallbackValue = false) {
  const value = process.env[name]?.trim().toLowerCase();

  if (!value) {
    return fallbackValue;
  }

  return ["1", "true", "yes", "on"].includes(value);
}

function parseCsvEnv(name) {
  return (process.env[name] || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getRateLimitConfig() {
  return {
    windowMs: getNumberEnv("CHAT_RATE_LIMIT_WINDOW_MS", DEFAULT_RATE_LIMIT_WINDOW_MS),
    maxRequests: getNumberEnv("CHAT_RATE_LIMIT_MAX_REQUESTS", DEFAULT_RATE_LIMIT_MAX_REQUESTS),
    blockMs: getNumberEnv("CHAT_RATE_LIMIT_BLOCK_MS", DEFAULT_RATE_LIMIT_BLOCK_MS),
  };
}

function getRateLimitBackend() {
  const configuredBackend = process.env.CHAT_RATE_LIMIT_BACKEND?.trim().toLowerCase();

  if (configuredBackend === "memory" || configuredBackend === "supabase") {
    return configuredBackend;
  }

  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1"
    ? "supabase"
    : "memory";
}

function getDebugResponseEnabled() {
  return getBooleanEnv("CHAT_API_DEBUG_RESPONSE", false);
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

function appendSecurityHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  appendSecurityHeaders(res);
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
    let byteLength = 0;
    let rejected = false;

    req.on("data", (chunk) => {
      if (rejected) {
        return;
      }

      byteLength += Buffer.byteLength(chunk);

      if (byteLength > MAX_BODY_BYTES) {
        rejected = true;
        const error = new Error("Request body is too large.");
        error.statusCode = 413;
        reject(error);
        return;
      }

      body += chunk;
    });

    req.on("end", () => {
      if (rejected) {
        return;
      }

      resolve(body);
    });

    req.on("error", (error) => {
      if (!rejected) {
        reject(error);
      }
    });
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

function normalizeIp(ip) {
  return String(ip || "")
    .replace(/^::ffff:/, "")
    .replace(/^::1$/, "127.0.0.1")
    .trim();
}

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  const firstForwardedIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(",")[0];

  return normalizeIp(
    req.headers["cf-connecting-ip"] ||
      req.headers["x-real-ip"] ||
      firstForwardedIp ||
      req.socket?.remoteAddress,
  );
}

function isLoopbackIp(ip) {
  return ip === "127.0.0.1" || ip === "::1" || ip === "localhost";
}

function getRequestOrigin(req) {
  const host = req.headers.host;

  if (!host) {
    return null;
  }

  const forwardedProto = String(req.headers["x-forwarded-proto"] || "").split(",")[0].trim();
  const protocol =
    forwardedProto ||
    (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");

  return `${protocol}://${host}`;
}

function isAllowedOrigin(req) {
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  const allowedOrigins = new Set(parseCsvEnv("ALLOWED_ORIGINS"));
  const requestOrigin = getRequestOrigin(req);

  if (requestOrigin) {
    allowedOrigins.add(requestOrigin);
  }

  if (!origin) {
    if (!referer) {
      return !getBooleanEnv(
        "CHAT_API_REQUIRE_ORIGIN",
        process.env.NODE_ENV === "production" || process.env.VERCEL === "1",
      );
    }

    try {
      return allowedOrigins.has(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  return allowedOrigins.has(origin);
}

function isTrustedIp(req) {
  const trustedIps = parseCsvEnv("TRUSTED_API_IPS");

  if (trustedIps.length === 0) {
    return true;
  }

  return trustedIps.includes(getClientIp(req));
}

function assertRequestAllowed(req) {
  if (!isTrustedIp(req)) {
    const error = new Error("This chat API is not available from this network.");
    error.statusCode = 403;
    throw error;
  }

  const secFetchSite = String(req.headers["sec-fetch-site"] || "").toLowerCase();

  if (secFetchSite && !["same-origin", "same-site", "none"].includes(secFetchSite)) {
    const error = new Error("Cross-site chat requests are not allowed.");
    error.statusCode = 403;
    throw error;
  }

  if (!isAllowedOrigin(req)) {
    const error = new Error("This chat API only accepts same-origin requests.");
    error.statusCode = 403;
    throw error;
  }
}

function getRequestSessionId(req) {
  const headerValue = req.headers["x-portfolio-chat-session"];
  const rawSessionId = Array.isArray(headerValue) ? headerValue[0] : headerValue;
  const sessionId = String(rawSessionId || "")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 80);

  return sessionId || "anonymous";
}

function getClientKey(req) {
  return `${getClientIp(req) || "unknown"}:${getRequestSessionId(req)}`;
}

function cleanupSecurityMaps(now) {
  for (const [key, bucket] of rateLimitBuckets.entries()) {
    if (bucket.resetAt <= now) {
      rateLimitBuckets.delete(key);
    }
  }

  for (const [key, blockedUntil] of blockedClients.entries()) {
    if (blockedUntil <= now) {
      blockedClients.delete(key);
    }
  }

  for (const [key, startedAt] of inFlightClients.entries()) {
    if (now - startedAt > STALE_IN_FLIGHT_MS) {
      inFlightClients.delete(key);
    }
  }
}

function assertMemoryRateLimit(clientKey) {
  const now = Date.now();
  const config = getRateLimitConfig();

  cleanupSecurityMaps(now);

  const blockedUntil = blockedClients.get(clientKey);

  if (blockedUntil && blockedUntil > now) {
    const error = new Error("Too many messages. Please wait before trying again.");
    error.statusCode = 429;
    error.retryAfterSeconds = Math.ceil((blockedUntil - now) / 1000);
    throw error;
  }

  const currentBucket = rateLimitBuckets.get(clientKey);
  const bucket =
    currentBucket && currentBucket.resetAt > now
      ? currentBucket
      : { count: 0, resetAt: now + config.windowMs };

  bucket.count += 1;
  rateLimitBuckets.set(clientKey, bucket);

  if (bucket.count > config.maxRequests) {
    const blockedUntilNext = now + config.blockMs;
    blockedClients.set(clientKey, blockedUntilNext);

    const error = new Error("Too many messages. Please wait before trying again.");
    error.statusCode = 429;
    error.retryAfterSeconds = Math.ceil(config.blockMs / 1000);
    throw error;
  }
}

async function assertSupabaseRateLimit(clientKey) {
  const config = getRateLimitConfig();
  const response = await fetch(getSupabaseRpcUrl("check_chat_rate_limit"), {
    method: "POST",
    headers: getServiceRoleHeaders(),
    body: JSON.stringify({
      p_client_key: clientKey,
      p_window_seconds: Math.ceil(config.windowMs / 1000),
      p_max_requests: config.maxRequests,
      p_block_seconds: Math.ceil(config.blockMs / 1000),
    }),
  });

  if (!response.ok) {
    const error = new Error(
      `Supabase check_chat_rate_limit request failed: ${await readErrorResponse(response)}`,
    );
    error.statusCode = 502;
    throw error;
  }

  const data = await response.json();
  const result = Array.isArray(data) ? data[0] : data;

  if (!result || result.allowed !== true) {
    const retryAfterSeconds = Math.max(1, Number(result?.retry_after_seconds) || 60);
    const error = new Error("Too many messages. Please wait before trying again.");
    error.statusCode = 429;
    error.retryAfterSeconds = retryAfterSeconds;
    throw error;
  }
}

async function assertRateLimit(clientKey) {
  if (getRateLimitBackend() === "supabase") {
    await assertSupabaseRateLimit(clientKey);
    return;
  }

  assertMemoryRateLimit(clientKey);
}

function acquireInFlightLock(clientKey) {
  const now = Date.now();
  cleanupSecurityMaps(now);

  if (inFlightClients.has(clientKey)) {
    const error = new Error("A reply is already being generated. Please wait for it to finish.");
    error.statusCode = 409;
    error.retryAfterSeconds = 5;
    throw error;
  }

  inFlightClients.set(clientKey, now);
}

function releaseInFlightLock(clientKey) {
  if (clientKey) {
    inFlightClients.delete(clientKey);
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
  const hasPortfolioSubject = /\b(ousama|he|him|his|about|your)\b/.test(normalized);
  const hasPersonalKeyword =
    /\b(age|old|turning|birthday|born|based|location|gta|relocat|travel|hobby|hobbies|fun|outside of|movies?|anime|shows?|gaming|games?|league|fifa|grandmaster|soccer|football|basketball|teams?|lakers|inter|milan|food|eat|downtown|restaurants?|spots?|personality|three words|3 words)\b/.test(
      normalized,
    );
  const isShortPersonalInterestPrompt =
    normalized.length <= 80 &&
    /\b(favou?rite|hobby|hobbies|interests?|teams?|anime|movies?|shows?|games?|gaming|food|eat|downtown|restaurants?|spots?|soccer|football|basketball|lakers|inter|milan)\b/.test(
      normalized,
    );
  const asksPersonalInfo =
    hasPersonalKeyword && (hasPortfolioSubject || isShortPersonalInterestPrompt);
  const asksAboutOusama =
    /\b(who is|tell me about|about|bit about|background|bio|introduce)\b/.test(normalized) &&
    /\b(ousama|him|his)\b/.test(normalized);
  const asksCandidateFit =
    /\b(why|should|hire|candidate|fit|strong|good|qualified|choose|bring|value|worth interviewing)\b/.test(normalized) &&
    /\b(hire|candidate|fit|strong|qualified|choose|interview|him|ousama)\b/.test(normalized);
  const asksDescription =
    /\b(describe|sum up|summarize|characterize|personality|traits?|qualities|what kind of|kind of person|work style)\b/.test(normalized) &&
    /\b(ousama|him|his|he)\b/.test(normalized);

  if (asksPersonalInfo) {
    return [
      message,
      "Ousama personal profile personality hobbies interests age location Greater Toronto Area GTA relocate travel work",
      "cheerful curious approachable social fun connects with people sports board games friends movies anime shows gaming League of Legends FIFA Grandmaster soccer stadiums Inter Milan Lakers Luka Doncic downtown food spots",
      "Age 23 turning 24 in June 2026 favorite movies Inception Shutter Island favorite anime One Piece Attack on Titan favorite shows How I Met Your Mother Snowfall Prison Break favorite places Alphas Shawarma Burger n Fries Forever Spring Sushi North of Brooklyn",
      "portfolio-knowledge/personal-profile.md",
    ].join("\n");
  }

  if (asksCandidateFit) {
    return [
      message,
      "What makes Ousama a strong candidate software engineering candidate hire him qualified fit strengths practical toolkit projects internships skills experience",
      "Software Engineering graduate Toronto Metropolitan University Ministry of Transportation Ontario Vanguard Financial BreakEven Smart Parking System Document Scanner RAG portfolio chatbot NAO Robot backend frontend data engineering cloud AI testing",
      "portfolio-knowledge/faq.md portfolio-knowledge/resume.md portfolio-knowledge/skills.md",
    ].join("\n");
  }

  if (asksAboutOusama) {
    return [
      message,
      "Ousama short bio education current focus career interests personality work style software engineering graduate Toronto Metropolitan University",
      "portfolio-knowledge/about-me.md",
    ].join("\n");
  }

  if (asksDescription) {
    return [
      message,
      "Ousama personal profile personality traits qualities describe in a few words cheerful curious approachable social easy to talk to likes having fun connecting with people hobbies",
      "He also has a practical hands-on work style and enjoys building useful software with data AI cloud tools APIs databases and backend systems",
      "portfolio-knowledge/personal-profile.md portfolio-knowledge/about-me.md portfolio-knowledge/faq.md portfolio-knowledge/resume.md",
    ].join("\n");
  }

  return message;
}

function getOpenAIHeaders() {
  return {
    Authorization: `Bearer ${requireEnv("OPENAI_API_KEY")}`,
    "Content-Type": "application/json",
  };
}

function getSupabaseRpcUrl(functionName) {
  const supabaseUrl = requireEnv("SUPABASE_URL").replace(/\/$/, "");
  return `${supabaseUrl}/rest/v1/rpc/${functionName}`;
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
  const response = await fetch(getSupabaseRpcUrl("match_portfolio_chunks"), {
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

function convertToParagraph(answer) {
  return answer
    .split("\n")
    .map((line) => line.trim().replace(/^[-*]\s+/, ""))
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function reduceBracketUse(answer) {
  return answer
    .replace(/[—–]/g, ", ")
    .replace(/\(([^()]{1,80})\)/g, ", $1,")
    .replace(/\[([^\[\]]{1,80})\]/g, ", $1,")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ",")
    .replace(/,\s*([.!?])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
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
  const normalized = reduceBracketUse(convertToParagraph(normalizeAnswer(answer)));

  if (!normalized || normalized === FALLBACK_ANSWER) {
    return normalized || FALLBACK_ANSWER;
  }

  if (normalized.length <= MAX_ANSWER_CHARS && /[.!?]$/.test(normalized)) {
    return normalized;
  }

  return shortenParagraphAnswer(normalized);
}

function normalizeQuestionText(question) {
  return question
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanFollowUpQuestion(question) {
  const cleaned = question
    .replace(/[—–]/g, ", ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return "";
  }

  return cleaned.endsWith("?") ? cleaned : `${cleaned.replace(/[.!]+$/, "")}?`;
}

function addFollowUpQuestion(questions, originalMessage, question) {
  const cleaned = cleanFollowUpQuestion(question);

  if (!cleaned) {
    return;
  }

  const normalized = normalizeQuestionText(cleaned);
  const normalizedOriginal = normalizeQuestionText(originalMessage);
  const alreadyExists = questions.some(
    (existing) => normalizeQuestionText(existing) === normalized,
  );

  if (alreadyExists || normalized === normalizedOriginal || cleaned.length > 120) {
    return;
  }

  questions.push(cleaned);
}

function getFollowUpBasis({ message, answer, matches }) {
  const matchText = matches
    .map((match) =>
      [
        match.source_file,
        match.project_name,
        match.section_title,
        match.metadata?.title,
      ]
        .filter(Boolean)
        .join(" "),
    )
    .join(" ");

  return `${message} ${answer} ${matchText}`.toLowerCase();
}

function isPersonalInterestQuestion(normalizedMessage) {
  return /\b(hobby|hobbies|fun|outside of|sports|anime|movies?|shows?|gaming|games?|league|fifa|grandmaster|soccer|football|basketball|teams?|lakers|inter|milan|food|eat|downtown|restaurants?|spots?|favou?rite)\b/.test(
    normalizedMessage,
  );
}

function isPersonalDetailsQuestion(normalizedMessage) {
  return /\b(age|old|turning|birthday|born|based|location|gta|greater toronto|relocat|travel for work|willing to travel)\b/.test(
    normalizedMessage,
  );
}

function isPersonalityQuestion(normalizedMessage) {
  return /\b(personality|describe|three words|3 words|traits?|qualities|kind of person|cheerful|curious|approachable|social)\b/.test(
    normalizedMessage,
  );
}

function buildFocusedFollowUps(message, candidates) {
  const questions = [];

  for (const question of candidates) {
    addFollowUpQuestion(questions, message, question);

    if (questions.length >= MAX_FOLLOW_UP_QUESTIONS) {
      break;
    }
  }

  return questions;
}

function buildFollowUpQuestions({ message, answer, matches = [] }) {
  if (!answer || answer === FALLBACK_ANSWER) {
    return FALLBACK_FOLLOW_UPS.slice(0, MAX_FOLLOW_UP_QUESTIONS);
  }

  const normalizedMessage = normalizeQuestionText(message);

  if (/\b(food|eat|downtown|restaurants?|spots?)\b/.test(normalizedMessage)) {
    return buildFocusedFollowUps(message, [
      "What does Ousama do for fun?",
      "How would you describe Ousama's personality?",
      "Can you tell me about Ousama's projects?",
    ]);
  }

  if (/\b(gaming|games?|league|fifa|grandmaster)\b/.test(normalizedMessage)) {
    return buildFocusedFollowUps(message, [
      "What teams does Ousama follow?",
      "What movies and shows does Ousama like?",
      "Can you tell me about Ousama's projects?",
    ]);
  }

  if (/\b(teams?|sports|soccer|football|basketball|lakers|inter|milan)\b/.test(normalizedMessage)) {
    return buildFocusedFollowUps(message, [
      "What stadiums has Ousama visited?",
      "What does Ousama do for fun?",
      "Can you tell me about Ousama's projects?",
    ]);
  }

  if (/\b(anime|movies?|shows?)\b/.test(normalizedMessage)) {
    return buildFocusedFollowUps(message, [
      "What games does Ousama play?",
      "What teams does Ousama follow?",
      "Can you tell me about Ousama's projects?",
    ]);
  }

  if (isPersonalInterestQuestion(normalizedMessage)) {
    return buildFocusedFollowUps(message, [
      "What games does Ousama play?",
      "What teams does Ousama follow?",
      "What movies and shows does Ousama like?",
      "Can you tell me about Ousama's projects?",
    ]);
  }

  if (isPersonalDetailsQuestion(normalizedMessage)) {
    return buildFocusedFollowUps(message, [
      "What type of roles is Ousama looking for?",
      "What is Ousama's technical background?",
      "Can you tell me about Ousama's projects?",
    ]);
  }

  if (isPersonalityQuestion(normalizedMessage)) {
    return buildFocusedFollowUps(message, [
      "What does Ousama do for fun?",
      "How does Ousama approach projects?",
      "Can you tell me about Ousama's projects?",
    ]);
  }

  const basis = getFollowUpBasis({ message, answer, matches });
  const questions = [];

  const topicRules = [
    {
      pattern: /\b(breakeven|budget|rails|ruby|oauth|jwt|ledger|expense)\b/,
      questions: [
        "How does BreakEven handle authentication?",
        "What backend logic did Ousama build in BreakEven?",
        "Can you tell me about Ousama's projects?",
      ],
    },
    {
      pattern: /\b(ministry|transportation|mto|traffic|tomtom|here|oracle|power bi)\b/,
      questions: [
        "What data tools did Ousama use at MTO?",
        "How did he use Python at the Ministry of Transportation?",
        "What project best shows his data engineering experience?",
      ],
    },
    {
      pattern: /\b(vanguard|financial|dashboard|tableau|accounting|reporting)\b/,
      questions: [
        "What kind of dashboards did Ousama build?",
        "What data analysis experience does he have?",
        "What projects show Ousama's technical skills?",
      ],
    },
    {
      pattern: /\b(nao|robot|robotics|face recognition|speech|dance|flask)\b/,
      questions: [
        "How did the NAO robot use AI?",
        "What role did computer vision play in the NAO project?",
        "What project shows computer vision experience?",
      ],
    },
    {
      pattern: /\b(document scanner|ocr|tesseract|opencv|computer vision|homography|scanner)\b/,
      questions: [
        "How does the document scanner work?",
        "What computer vision techniques did Ousama use?",
        "What project best shows data engineering experience?",
      ],
    },
    {
      pattern: /\b(smart parking|microservice|fastapi|gateway|reservation|parking)\b/,
      questions: [
        "How were the smart parking microservices organized?",
        "What cloud concepts did the smart parking project show?",
        "What other backend experience does Ousama have?",
      ],
    },
    {
      pattern: /\b(football pick|pickems|prediction|league|fixture|sports data)\b/,
      questions: [
        "What features would Football Pickems include?",
        "How would sports data be used in Football Pickems?",
        "Can you tell me about Ousama's projects?",
      ],
    },
    {
      pattern: /\b(hire|candidate|qualified|strong|interview|fit|software engineering candidate)\b/,
      questions: [
        "What is his strongest full-stack project?",
        "What backend experience does Ousama have?",
        "What did he do at the Ministry of Transportation?",
      ],
    },
    {
      pattern: /\b(skill|technologies|backend|frontend|database|cloud|api|supabase|postgres|aws)\b/,
      questions: [
        "What backend experience does Ousama have?",
        "Which project best shows his database experience?",
        "What project shows AI or machine learning experience?",
      ],
    },
    {
      pattern: /\b(age|old|gta|greater toronto|relocat|travel for work|based|location)\b/,
      questions: [
        "What type of roles is Ousama looking for?",
        "What is Ousama's technical background?",
        "What projects show his backend skills?",
      ],
    },
    {
      pattern: /\b(hobby|hobbies|fun|sports|anime|movies|shows|gaming|league of legends|fifa|inter milan|lakers|food|downtown|restaurant|spots)\b/,
      questions: [
        "What games does Ousama play?",
        "What teams does Ousama follow?",
        "Can you tell me about Ousama's projects?",
      ],
    },
    {
      pattern: /\b(personality|cheerful|curious|approachable|social|three words|3 words|work style)\b/,
      questions: [
        "What does Ousama do for fun?",
        "How does Ousama approach projects?",
        "Why is Ousama a strong software engineering candidate?",
      ],
    },
  ];

  for (const rule of topicRules) {
    if (!rule.pattern.test(basis)) {
      continue;
    }

    for (const question of rule.questions) {
      addFollowUpQuestion(questions, message, question);

      if (questions.length >= MAX_FOLLOW_UP_QUESTIONS) {
        return questions;
      }
    }
  }

  const defaultSwitchQuestions = [
    "What is Ousama's strongest project?",
    "What backend experience does Ousama have?",
    "What does Ousama do for fun?",
    "Why is Ousama a strong software engineering candidate?",
  ];

  for (const question of defaultSwitchQuestions) {
    addFollowUpQuestion(questions, message, question);

    if (questions.length >= MAX_FOLLOW_UP_QUESTIONS) {
      break;
    }
  }

  return questions;
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
    "Answer like a helpful, natural portfolio assistant speaking to a recruiter or visitor.",
    "Use only the provided portfolio context.",
    "Do not invent projects, tools, dates, employers, metrics, credentials, or personal details.",
    "If the context has directly relevant facts, answer briefly using those facts even if the context is not exhaustive.",
    "For broad bio or background questions, Short Bio, Summary, Education, Current Focus, Career Interests, and Work Style sections are enough context to answer.",
    "For hiring or candidate-fit questions, synthesize from education, internships, projects, skills, and work style in the context, but keep it to 2 clear reasons.",
    "For short descriptive prompts, such as describing Ousama in a few words, infer concise traits only from the context and respect the requested word count when possible.",
    `If the context has no directly relevant facts, reply exactly: "${FALLBACK_ANSWER}"`,
    "Use simple, plain language that sounds human, not like a resume bullet list.",
    "Prefer conversational phrasing such as 'He has worked on...' or 'A good example is...' when it fits.",
    "Keep the answer short by default: 1-2 short sentences and under 70 words.",
    "Always answer in paragraph form. Do not use bullet points, numbered lists, tables, markdown headings, or source labels.",
    "Avoid parentheses and square brackets. Use commas or plain wording instead.",
    "Avoid em dashes. Use commas or short sentences instead.",
    "If the user asks a broad question, summarize instead of covering every detail.",
    "Avoid corporate wording, stiff summaries, hype, and overly technical detail unless the user asks for detail.",
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

  let clientKey = null;
  let lockAcquired = false;

  try {
    assertRequestAllowed(req);

    const contentType = String(req.headers["content-type"] || "").toLowerCase();

    if (!contentType.includes("application/json")) {
      return sendJson(res, 415, {
        error: "Content-Type must be application/json.",
      });
    }

    clientKey = getClientKey(req);
    await assertRateLimit(clientKey);
    acquireInFlightLock(clientKey);
    lockAcquired = true;

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
        follow_up_questions: SMALL_TALK_FOLLOW_UPS,
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
    const followUpQuestions = buildFollowUpQuestions({
      message,
      answer,
      matches: formattedMatches,
    });

    const payload = {
      answer,
      follow_up_questions: followUpQuestions,
    };

    if (getDebugResponseEnabled()) {
      payload.matches = formattedMatches;
      payload.sources = formatSources(formattedMatches);
    }

    return sendJson(res, 200, payload);
  } catch (error) {
    if (!error.statusCode || error.statusCode >= 500) {
      console.error(error);
    }

    if (error.retryAfterSeconds) {
      res.setHeader("Retry-After", String(error.retryAfterSeconds));
    }

    const statusCode = error.statusCode || 500;

    return sendJson(res, error.statusCode || 500, {
      error: statusCode >= 500 ? "The chat service is temporarily unavailable." : error.message,
      ...(error.retryAfterSeconds ? { retry_after_seconds: error.retryAfterSeconds } : {}),
    });
  } finally {
    if (lockAcquired) {
      releaseInFlightLock(clientKey);
    }
  }
};
