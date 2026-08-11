import type { ServerResponse } from "node:http";

export const sendJson = (
  res: ServerResponse,
  statusCode: number,
  body: unknown,
) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};
