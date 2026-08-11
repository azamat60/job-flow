import type { RouteHandler } from "../router.js";
import { isObjectBody } from "../helpers/isBodyObject.js";

export const postJobHandler: RouteHandler = (_req, res, _params, body) => {
  if (!isObjectBody(body)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "JSON object required" }));
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const responseBody = {
    message: "Job created successfully",
  };
  res.end(JSON.stringify(responseBody));
};
