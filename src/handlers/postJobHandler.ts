import type { RouteHandler } from "../router.js";

export const postJobHandler: RouteHandler = (_req, res, _params, body) => {
  console.log(body, "body");
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const responseBody = {
    message: "Job created successfully",
  };
  res.end(JSON.stringify(responseBody));
};
