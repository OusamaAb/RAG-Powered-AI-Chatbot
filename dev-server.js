const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const chatHandler = require("./api/chat.js");

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || (process.env.RENDER ? "0.0.0.0" : "127.0.0.1");
const ROOT = __dirname;
const INDEX_PATH = "/Portfolio%20Website%20Code/index.html";

const PUBLIC_FILES = new Set([
  "/Portfolio Website Code/index.html",
  "/Portfolio Website Code/styles.css",
  "/Portfolio Website Code/chat.css",
  "/Portfolio Website Code/sections.jsx",
  "/Portfolio Website Code/chat.jsx",
  "/Portfolio Website Code/app.jsx",
  "/image-slot.js",
  "/profile.js",
  "/chatbot.jsx",
  "/shared/tweaks-panel.jsx",
  "/assets/Ousama Portfolio Picture.jpg",
  "/assets/Ousama Ai pic.png",
  "/assets/Ousama_Alabdullah_Resume_May2026 (1).pdf",
]);

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".jsx": "text/babel; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
};

function send(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, headers);
  res.end(body);
}

function sendJson(res, statusCode, payload) {
  send(res, statusCode, JSON.stringify(payload), {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
}

function getRequestPath(req) {
  const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
  return decodeURIComponent(url.pathname);
}

function serveStatic(req, res) {
  const requestPath = getRequestPath(req);

  if (requestPath === "/") {
    send(res, 302, "", { Location: INDEX_PATH });
    return;
  }

  if (!PUBLIC_FILES.has(requestPath)) {
    send(res, 404, "Not found", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  const filePath = path.join(ROOT, requestPath);

  if (!filePath.startsWith(ROOT)) {
    send(res, 403, "Forbidden", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "Not found", { "Content-Type": "text/plain; charset=utf-8" });
      return;
    }

    send(res, 200, data, {
      "Content-Type": CONTENT_TYPES[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
  });
}

async function handleApi(req, res) {
  try {
    await chatHandler(req, res);
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Unexpected server error." });
  }
}

const server = http.createServer((req, res) => {
  if (req.url === "/health" || req.url === "/healthz") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.url.startsWith("/api/chat")) {
    handleApi(req, res);
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    send(res, 405, "Method not allowed", {
      Allow: "GET, HEAD",
      "Content-Type": "text/plain; charset=utf-8",
    });
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Portfolio dev server running at http://${HOST}:${PORT}${INDEX_PATH}`);
});
