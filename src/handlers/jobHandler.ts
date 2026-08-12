import type { RouteHandler } from "../router.js";

export const jobHandler: RouteHandler = async (
  _req,
  res,
  params,
  repository,
) => {
  const { id } = params;

  res.setHeader("Content-Type", "application/json");
  const job = await repository.findById(id);

  if (!job) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Job not found" }));
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ job }));
};
