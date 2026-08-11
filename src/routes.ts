import type { Route } from "./router.js";
import { healthHandler } from "./handlers/healthHandler.js";
import { jobHandler } from "./handlers/jobHandler.js";
import { listJobHandler } from "./handlers/listJobHandler.js";

export const routes: Route[] = [
  {
    method: "GET",
    path: "/health",
    handler: healthHandler,
  },
  {
    method: "GET",
    path: "/jobs",
    handler: listJobHandler,
  },
  {
    method: "GET",
    path: "/jobs/:id",
    handler: jobHandler,
  },
];
