import { Pipeline } from "./pipeline.js";

export type JobStatus = "pending" | "in_progress" | "completed" | "failed";

export interface Job {
  id: string;
  name: string;
  status: JobStatus;
  pipelineId: string;
  createdAt: Date;
  steps: JobStep[];
}

export interface JobStep {
  id: string;
  name: string;
  status: JobStatus;
}

export interface CreateJobInput {
  name: string;
  pipeline: Pipeline;
}
