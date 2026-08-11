import type { RouteHandler } from "../router.js";

export const listJobHandler: RouteHandler = (_req, res, _params) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const body = {
    jobs: [],
  };
  res.end(JSON.stringify(body));
};
