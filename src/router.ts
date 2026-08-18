import type { IncomingMessage, ServerResponse } from "node:http";

import type { JobRepository } from "./repositories/job-repository.js";
import { PipelineRepository } from "./repositories/pipeline-repository.js";
import { JobExecutor } from "./executors/jobExecutor.js";
export type RouteParams = Record<string, string>;

export type Dependencies = {
  jobRepository: JobRepository;
  pipelineRepository: PipelineRepository;
  jobExecutor: JobExecutor;
};

export type RouteHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  params: RouteParams,
  dependencies: Dependencies,
  body?: unknown,
) => void;

export type Route = {
  method: string;
  path: string;
  handler: RouteHandler;
};

const getSegments = (path: string): string[] => path.split("/").filter(Boolean);

const matchPath = (pattern: string, pathname: string): RouteParams | null => {
  const patternSegments = getSegments(pattern);
  const pathnameSegments = getSegments(pathname);
  if (patternSegments.length !== pathnameSegments.length) {
    return null;
  }

  const params: RouteParams = {};

  for (let index = 0; index < patternSegments.length; index += 1) {
    const patternSegment = patternSegments[index];
    const pathnameSegment = pathnameSegments[index];

    if (!patternSegment || !pathnameSegment) {
      return null;
    }

    if (patternSegment.startsWith(":")) {
      params[patternSegment.slice(1)] = pathnameSegment;
      continue;
    }

    if (patternSegment !== pathnameSegment) {
      return null;
    }
  }
  return params;
};

export const findRoute = (
  routes: Route[],
  method: string,
  pathname: string,
): { handler: RouteHandler; params: RouteParams } | null => {
  for (const route of routes) {
    if (route.method !== method) {
      continue;
    }

    const params = matchPath(route.path, pathname);

    if (params) {
      return { handler: route.handler, params };
    }
  }

  return null;
};
