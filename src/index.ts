import http from "node:http";
import "dotenv/config";

import { routes } from "./routes.js";
import { findRoute } from "./router.js";
const PORT = process.env.PORT || 8080;

async function readJson(req: http.IncomingMessage) {
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks).toString("utf8");
    return body ? JSON.parse(body) : {};
  } catch (error) {
    console.error(error);
    return {};
  }
}

const METHODS_WITH_BODY = ["POST", "PUT", "PATCH", "DELETE"];

const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse) => {
    let body: Record<string, unknown> | undefined;
    const requestUrl = new URL(req.url ?? "/", "http://localhost");
    const method = req.method ?? "GET";
    const match = findRoute(routes, method, requestUrl.pathname);
    if (METHODS_WITH_BODY.includes(method)) {
      body = await readJson(req);
    }

    if (match) {
      match.handler(req, res, match.params, body ?? undefined);
      return;
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
