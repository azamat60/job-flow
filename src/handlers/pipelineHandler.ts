import type { RouteHandler } from "../router.js";
import { isObjectBody } from "../helpers/isBodyObject.js";

export const getPipelineHandler: RouteHandler = async (
  _req,
  res,
  params,
  repositories,
) => {
  const { id } = params;

  res.setHeader("Content-Type", "application/json");
  const pipeline = await repositories.pipelineRepository.findById(id);

  if (!pipeline) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Pipeline not found" }));
    return;
  }
  res.statusCode = 200;
  res.end(JSON.stringify({ pipeline }));
};

export const getAllPipelinesHandler: RouteHandler = async (
  _req,
  res,
  _params,
  repositories,
) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const body = {
    pipelines: await repositories.pipelineRepository.findAll(),
  };
  res.end(JSON.stringify(body));
};

export const postPipelineHandler: RouteHandler = async (
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

  if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Name is required" }));
    return;
  }

  if (!body.steps || !Array.isArray(body.steps) || !body.steps.length) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Steps is required" }));
    return;
  }

  if (!body.steps.every((step) => typeof step === "string" && step.trim())) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Steps must be an array of strings" }));
    return;
  }

  const pipeline = await repositories.pipelineRepository.create({
    name: body.name,
    steps: body.steps,
  });
  res.statusCode = 201;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ pipeline }));
};
