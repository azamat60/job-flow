import type { Route } from "./router.js";
import { healthHandler } from "./handlers/healthHandler.js";
import { jobHandler } from "./handlers/jobHandler.js";

export const routes: Route[] = [
  {
    method: "GET",
    path: "/health",
    handler: healthHandler,
  },
  {
    method: "GET",
    path: "/jobs",
    handler: jobHandler,
  },
  {
    method: "GET",
    path: "/jobs/:id",
    handler: jobHandler,
  },
];
