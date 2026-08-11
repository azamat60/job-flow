import http from "node:http";
import "dotenv/config";

const PORT = process.env.PORT || 8080;

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, World!");
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
