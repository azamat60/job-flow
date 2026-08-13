import type { Route } from "./router.js";
import { healthHandler } from "./handlers/healthHandler.js";
import {
  getAllJobsHandler,
  getJobHandler,
  postJobHandler,
} from "./handlers/jobHandler.js";
import {
  getAllPipelinesHandler,
  getPipelineHandler,
  postPipelineHandler,
} from "./handlers/pipelineHandler.js";

export const routes: Route[] = [
  {
    method: "GET",
    path: "/health",
    handler: healthHandler,
  },
  {
    method: "GET",
    path: "/jobs",
    handler: getAllJobsHandler,
  },
  {
    method: "GET",
    path: "/jobs/:id",
    handler: getJobHandler,
  },
  {
    method: "POST",
    path: "/jobs",
    handler: postJobHandler,
  },
  {
    method: "GET",
    path: "/pipelines",
    handler: getAllPipelinesHandler,
  },
  {
    method: "GET",
    path: "/pipelines/:id",
    handler: getPipelineHandler,
  },
  {
    method: "POST",
    path: "/pipelines",
    handler: postPipelineHandler,
  },
];
