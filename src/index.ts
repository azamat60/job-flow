import http from "node:http";
import "dotenv/config";

const PORT = process.env.PORT || 8080;

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    const url = req.url ?? "/";

    if (req.method === "GET" && url === "/health") {
      const body = { status: "ok", uptime: process.uptime() };

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(body));
      return;
    }

    if (req.method === "GET" && url === "/") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Hello, World!");
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
