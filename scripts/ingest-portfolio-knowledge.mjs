#!/usr/bin/env node

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const KNOWLEDGE_DIR = path.join(REPO_ROOT, "portfolio-knowledge");

const TARGET_CHUNK_CHARS = 1400;
const MAX_CHUNK_CHARS = 1800;
const CHUNK_OVERLAP_CHARS = 200;
const DEFAULT_EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMENSIONS = 1536;
const OPENAI_EMBEDDINGS_URL = "https://api.openai.com/v1/embeddings";
const EMBEDDING_BATCH_SIZE = 64;
const SUPABASE_INSERT_BATCH_SIZE = 100;

function normalizeMarkdown(markdown) {
  return markdown.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
}

function normalizeWhitespace(text) {
  return text.replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n").trim();
}

function isMarkdownFile(filePath) {
  return filePath.toLowerCase().endsWith(".md");
}

function isHiddenPathSegment(segment) {
  return segment.startsWith(".");
}

async function collectMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (isHiddenPathSegment(entry.name)) {
      continue;
    }

    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(absolutePath)));
      continue;
    }

    if (entry.isFile() && isMarkdownFile(entry.name)) {
      files.push(absolutePath);
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

function extractTitle(markdown, fallbackName) {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  return titleMatch?.[1]?.trim() || fallbackName;
}

function inferCategory(relativeFile) {
  const parts = relativeFile.split(path.sep);
  const firstFolder = parts[1];

  if (firstFolder === "projects") return "project";
  if (firstFolder === "experience") return "experience";
  if (firstFolder === "courses") return "course";
  return "portfolio";
}

function inferProjectName(relativeFile, title) {
  const category = inferCategory(relativeFile);

  if (category === "project" || category === "experience" || category === "course") {
    return title;
  }

  return null;
}

function parseSections(markdown, title) {
  const lines = markdown.split("\n");
  const sections = [];
  let currentHeading = title;
  let currentLines = [];

  function pushSection() {
    const body = normalizeWhitespace(currentLines.join("\n"));
    if (!body) return;

    sections.push({
      sectionTitle: currentHeading,
      body,
    });
  }

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      pushSection();
      currentHeading = headingMatch[2].trim();
      currentLines = [line];
      continue;
    }

    currentLines.push(line);
  }

  pushSection();
  return sections;
}

function classifySection(text) {
  const withoutHeadings = text
    .split("\n")
    .filter((line) => !line.trim().startsWith("#"))
    .map((line) => line.trim())
    .filter(Boolean);

  if (withoutHeadings.length === 0) {
    return "empty";
  }

  const isPlaceholder = withoutHeadings.every((line) =>
    /^\[(add|write|list|explain|describe|include)\b.+\]$/i.test(line),
  );

  return isPlaceholder ? "placeholder" : "content";
}

function splitOversizedSection(text) {
  if (text.length <= MAX_CHUNK_CHARS) {
    return [text];
  }

  const blocks = text.split(/\n{2,}/).filter((block) => block.trim());
  const chunks = [];
  let current = "";

  for (const block of blocks) {
    const candidate = current ? `${current}\n\n${block}` : block;

    if (candidate.length <= TARGET_CHUNK_CHARS || !current) {
      current = candidate;
      continue;
    }

    chunks.push(current);

    const overlap = current.slice(-CHUNK_OVERLAP_CHARS).trim();
    current = overlap ? `${overlap}\n\n${block}` : block;
  }

  if (current) {
    chunks.push(current);
  }

  return chunks.flatMap((chunk) => splitVeryLongText(chunk));
}

function splitVeryLongText(text) {
  if (text.length <= MAX_CHUNK_CHARS) {
    return [text];
  }

  const chunks = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + TARGET_CHUNK_CHARS, text.length);

    if (end < text.length) {
      const nearestSpace = text.lastIndexOf(" ", end);
      if (nearestSpace > start + TARGET_CHUNK_CHARS * 0.6) {
        end = nearestSpace;
      }
    }

    chunks.push(text.slice(start, end).trim());

    if (end >= text.length) {
      break;
    }

    start = Math.max(end - CHUNK_OVERLAP_CHARS, start + 1);
  }

  return chunks.filter(Boolean);
}

function buildChunksForFile({ markdown, relativeFile }) {
  const title = extractTitle(markdown, path.basename(relativeFile, ".md"));
  const category = inferCategory(relativeFile);
  const projectName = inferProjectName(relativeFile, title);
  const sections = parseSections(markdown, title);
  const chunks = [];
  const warnings = [];

  for (const section of sections) {
    const sectionType = classifySection(section.body);

    if (sectionType === "empty") {
      continue;
    }

    if (sectionType === "placeholder") {
      warnings.push(`Skipped placeholder-only section "${section.sectionTitle}" in ${relativeFile}`);
      continue;
    }

    for (const content of splitOversizedSection(section.body)) {
      chunks.push({
        content,
        source_file: relativeFile,
        project_name: projectName,
        section_title: section.sectionTitle,
        chunk_index: chunks.length,
        metadata: {
          category,
          title,
          char_count: content.length,
        },
      });
    }
  }

  return { chunks, warnings };
}

export async function buildPortfolioChunks() {
  const markdownFiles = await collectMarkdownFiles(KNOWLEDGE_DIR);
  const chunks = [];
  const warnings = [];

  for (const absoluteFile of markdownFiles) {
    const relativeFile = path.relative(REPO_ROOT, absoluteFile);
    const markdown = normalizeMarkdown(await readFile(absoluteFile, "utf8"));

    if (!markdown) {
      warnings.push(`Skipped empty file ${relativeFile}`);
      continue;
    }

    const result = buildChunksForFile({ markdown, relativeFile });
    chunks.push(...result.chunks);
    warnings.push(...result.warnings);
  }

  return {
    chunks,
    warnings,
    stats: {
      files_read: markdownFiles.length,
      chunks_created: chunks.length,
      warnings: warnings.length,
    },
  };
}

async function loadEnvFile(filePath) {
  let envText;

  try {
    envText = await readFile(filePath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return;
    }

    throw error;
  }

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
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getEmbeddingModel() {
  return process.env.OPENAI_EMBEDDING_MODEL?.trim() || DEFAULT_EMBEDDING_MODEL;
}

function assertEmbeddingModel(model) {
  if (model !== DEFAULT_EMBEDDING_MODEL) {
    throw new Error(
      `OPENAI_EMBEDDING_MODEL must be ${DEFAULT_EMBEDDING_MODEL} because the database column is vector(${EMBEDDING_DIMENSIONS}).`,
    );
  }
}

function chunkArray(items, batchSize) {
  const batches = [];

  for (let index = 0; index < items.length; index += batchSize) {
    batches.push(items.slice(index, index + batchSize));
  }

  return batches;
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

async function createEmbeddings({ chunks, apiKey, model }) {
  const batches = chunkArray(chunks, EMBEDDING_BATCH_SIZE);
  const embeddings = [];

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex += 1) {
    const batch = batches[batchIndex];
    console.log(`Embedding batch ${batchIndex + 1}/${batches.length} (${batch.length} chunks)`);

    const response = await fetch(OPENAI_EMBEDDINGS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: batch.map((chunk) => chunk.content),
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI embeddings request failed: ${await readErrorResponse(response)}`);
    }

    const data = await response.json();
    const batchEmbeddings = [...data.data].sort((a, b) => a.index - b.index);

    for (const item of batchEmbeddings) {
      if (!Array.isArray(item.embedding) || item.embedding.length !== EMBEDDING_DIMENSIONS) {
        throw new Error(
          `Unexpected embedding dimension: expected ${EMBEDDING_DIMENSIONS}, received ${item.embedding?.length ?? "unknown"}.`,
        );
      }

      embeddings.push(item.embedding);
    }
  }

  if (embeddings.length !== chunks.length) {
    throw new Error(`Expected ${chunks.length} embeddings but received ${embeddings.length}.`);
  }

  return chunks.map((chunk, index) => ({
    ...chunk,
    embedding: embeddings[index],
  }));
}

function getSupabaseRestUrl(supabaseUrl, pathName, query = "") {
  const normalizedBaseUrl = supabaseUrl.replace(/\/$/, "");
  return `${normalizedBaseUrl}/rest/v1/${pathName}${query}`;
}

function getSupabaseHeaders(serviceRoleKey, extraHeaders = {}) {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    ...extraHeaders,
  };
}

async function clearPortfolioChunks({ supabaseUrl, serviceRoleKey }) {
  const response = await fetch(
    getSupabaseRestUrl(supabaseUrl, "portfolio_chunks", "?id=not.is.null"),
    {
      method: "DELETE",
      headers: getSupabaseHeaders(serviceRoleKey),
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase delete failed: ${await readErrorResponse(response)}`);
  }
}

async function insertPortfolioChunks({ rows, supabaseUrl, serviceRoleKey }) {
  const batches = chunkArray(rows, SUPABASE_INSERT_BATCH_SIZE);

  for (let batchIndex = 0; batchIndex < batches.length; batchIndex += 1) {
    const batch = batches[batchIndex];
    console.log(`Inserting batch ${batchIndex + 1}/${batches.length} (${batch.length} rows)`);

    const response = await fetch(getSupabaseRestUrl(supabaseUrl, "portfolio_chunks"), {
      method: "POST",
      headers: getSupabaseHeaders(serviceRoleKey, {
        Prefer: "return=minimal",
      }),
      body: JSON.stringify(batch),
    });

    if (!response.ok) {
      throw new Error(`Supabase insert failed: ${await readErrorResponse(response)}`);
    }
  }
}

async function countPortfolioChunks({ supabaseUrl, serviceRoleKey }) {
  const response = await fetch(getSupabaseRestUrl(supabaseUrl, "portfolio_chunks", "?select=id"), {
    method: "HEAD",
    headers: getSupabaseHeaders(serviceRoleKey, {
      Prefer: "count=exact",
    }),
  });

  if (!response.ok) {
    throw new Error(`Supabase count failed: ${await readErrorResponse(response)}`);
  }

  const contentRange = response.headers.get("content-range") || "";
  const count = Number(contentRange.split("/")[1]);
  return Number.isFinite(count) ? count : null;
}

async function uploadChunksToSupabase(result) {
  await loadEnvFile(path.join(REPO_ROOT, ".env.local"));

  const apiKey = requireEnv("OPENAI_API_KEY");
  const supabaseUrl = requireEnv("SUPABASE_URL");
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  const model = getEmbeddingModel();

  assertEmbeddingModel(model);

  if (!result.chunks.length) {
    throw new Error("No chunks were created. Fix the portfolio markdown before uploading.");
  }

  console.log(`Preparing to embed and upload ${result.chunks.length} chunks.`);
  console.log(`Embedding model: ${model}`);

  const rows = await createEmbeddings({
    chunks: result.chunks,
    apiKey,
    model,
  });

  console.log("Clearing existing rows from portfolio_chunks");
  await clearPortfolioChunks({ supabaseUrl, serviceRoleKey });

  await insertPortfolioChunks({
    rows,
    supabaseUrl,
    serviceRoleKey,
  });

  const storedCount = await countPortfolioChunks({ supabaseUrl, serviceRoleKey });

  console.log("Upload complete.");
  console.log(`Rows inserted: ${rows.length}`);

  if (storedCount !== null) {
    console.log(`Rows currently in Supabase: ${storedCount}`);
  }
}

function parseArgs(argv) {
  const args = {
    json: false,
    outputPath: null,
    upload: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--json") {
      args.json = true;
      continue;
    }

    if (arg === "--output") {
      if (!argv[index + 1]) {
        throw new Error("--output requires a file path.");
      }

      args.outputPath = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--upload") {
      args.upload = true;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function printHelp() {
  console.log(`
Usage:
  node scripts/ingest-portfolio-knowledge.mjs
  node scripts/ingest-portfolio-knowledge.mjs --json
  node scripts/ingest-portfolio-knowledge.mjs --output tmp/portfolio-chunks.json
  node scripts/ingest-portfolio-knowledge.mjs --upload

Default mode previews chunks from portfolio-knowledge markdown files.
Use --upload to create OpenAI embeddings and replace rows in Supabase.
`.trim());
}

function printSummary(result) {
  console.log("Portfolio knowledge ingestion preview");
  console.log("-------------------------------------");
  console.log(`Files read:      ${result.stats.files_read}`);
  console.log(`Chunks created:  ${result.stats.chunks_created}`);
  console.log(`Warnings:        ${result.stats.warnings}`);

  if (result.chunks.length > 0) {
    console.log("\nSample chunks:");
    for (const chunk of result.chunks.slice(0, 5)) {
      console.log(
        `- ${chunk.source_file} | ${chunk.section_title} | chunk ${chunk.chunk_index} | ${chunk.content.length} chars`,
      );
    }
  }

  if (result.warnings.length > 0) {
    console.log("\nWarnings:");
    for (const warning of result.warnings) {
      console.log(`- ${warning}`);
    }
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const result = await buildPortfolioChunks();

  if (args.upload) {
    if (result.warnings.length > 0) {
      printSummary(result);
      throw new Error("Fix placeholder or empty-content warnings before uploading embeddings.");
    }

    await uploadChunksToSupabase(result);
    return;
  }

  if (args.outputPath) {
    const outputPath = path.resolve(REPO_ROOT, args.outputPath);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(result.chunks, null, 2)}\n`);
    console.log(`Wrote ${result.chunks.length} chunks to ${path.relative(REPO_ROOT, outputPath)}`);
    return;
  }

  if (args.json) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  printSummary(result);
}

if (process.argv[1] && __filename === path.resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
