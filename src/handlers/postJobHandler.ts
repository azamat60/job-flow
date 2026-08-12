import type { RouteHandler } from "../router.js";
import { isObjectBody } from "../helpers/isBodyObject.js";

export const postJobHandler: RouteHandler = async (
  _req,
  res,
  _params,
  repository,
  body,
) => {
  if (!isObjectBody(body)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "JSON object required" }));
    return;
  }

  if (!body.title || typeof body.title !== "string") {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Title is required" }));
    return;
  }

  const job = await repository.create({ title: body.title });
  res.statusCode = 201;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ job }));
};
