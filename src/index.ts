import http from "node:http";
import "dotenv/config";

import { routes } from "./routes.js";
import { findRoute } from "./router.js";
const PORT = process.env.PORT || 8080;

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    const requestUrl = new URL(req.url ?? "/", "http://localhost");
    const method = req.method ?? "GET";
    const match = findRoute(routes, method, requestUrl.pathname);

    if (match) {
      match.handler(req, res, match.params);
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
