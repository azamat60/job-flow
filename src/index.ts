import http from "node:http";
import "dotenv/config";

import { routes } from "./routes.js";
import { findRoute } from "./router.js";
const PORT = process.env.PORT || 8080;
import {
  readJson,
  PayloadTooLargeError,
  InvalidJsonError,
} from "./readJson.js";
import { sendJson } from "./helpers/sendJson.js";

const MAX_BODY_BYTES = 100 * 1024;
const METHODS_WITH_BODY = ["POST", "PUT", "PATCH", "DELETE"];

const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse) => {
    const requestUrl = new URL(req.url ?? "/", "http://localhost");
    const method = req.method ?? "GET";
    const match = findRoute(routes, method, requestUrl.pathname);

    if (!match) {
      req.resume();
      sendJson(res, 404, { error: "Not Found" });
      return;
    }

    let body: unknown;
    try {
      if (METHODS_WITH_BODY.includes(method)) {
        body = await readJson(req, MAX_BODY_BYTES);
      }
    } catch (error) {
      if (error instanceof PayloadTooLargeError) {
        sendJson(res, 413, { error: "Payload Too Large" });
        return;
      }

      if (error instanceof InvalidJsonError) {
        sendJson(res, 400, { error: "Invalid JSON" });
        return;
      }

      sendJson(res, 400, { error: "Unable to read request body" });
      return;
    }

    match.handler(req, res, match.params, body);
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
