import type { RouteHandler } from "../router.js";
import { isObjectBody } from "../helpers/isBodyObject.js";

export const getJobHandler: RouteHandler = async (
  _req,
  res,
  params,
  repositories,
) => {
  const { id } = params;

  res.setHeader("Content-Type", "application/json");
  const job = await repositories.jobRepository.findById(id);

  if (!job) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Job not found" }));
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ job }));
};

export const getAllJobsHandler: RouteHandler = async (
  _req,
  res,
  _params,
  repositories,
) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const body = {
    jobs: await repositories.jobRepository.findAll(),
  };
  res.end(JSON.stringify(body));
};

export const postJobHandler: RouteHandler = async (
  _req,
  res,
  _params,
  repositories,
  body,
) => {
  if (!isObjectBody(body)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "JSON object required" }));
    return;
  }

  if (!body.name || typeof body.name !== "string") {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Name is required" }));
    return;
  }

  if (!body.pipelineId || typeof body.pipelineId !== "string") {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Pipeline ID is required" }));
    return;
  }

  const currentPipeline = await repositories.pipelineRepository.findById(
    body.pipelineId,
  );
  if (!currentPipeline) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Pipeline not found" }));
    return;
  }

  const job = await repositories.jobRepository.create({
    name: body.name,
    pipeline: currentPipeline,
  });
  res.statusCode = 201;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ job }));
};
