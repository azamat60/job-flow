import type { RouteHandler } from "../router.js";

export const listJobHandler: RouteHandler = async (
  _req,
  res,
  _params,
  repository,
) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const body = {
    jobs: await repository.findAll(),
  };
  res.end(JSON.stringify(body));
};
