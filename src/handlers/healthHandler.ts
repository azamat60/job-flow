import type { RouteHandler } from "../router.js";

export const healthHandler: RouteHandler = (_req, res) => {
  const body = {
    status: "ok",
    uptime: process.uptime(),
  };

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
};
