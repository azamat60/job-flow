import type { RouteHandler } from "../router.js";

export const jobHandler: RouteHandler = (_req, res, params) => {
  const { id } = params;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const body = {
    id,
  };
  res.end(JSON.stringify(body));
};
