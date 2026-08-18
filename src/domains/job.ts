import { Pipeline } from "./pipeline.js";

export type JobStatus = "queued" | "in_progress" | "completed" | "failed";
export type JobStepStatus = "pending" | Omit<JobStatus, "queued">;

export interface Job {
  id: string;
  name: string;
  status: JobStatus;
  pipelineId: string;
  createdAt: Date;
  startedAt?: Date;
  finishedAt?: Date;
  steps: JobStep[];
}

export interface JobStep {
  id: string;
  name: string;
  status: JobStepStatus;
  startedAt?: Date;
  finishedAt?: Date;
}

export interface CreateJobInput {
  name: string;
  pipeline: Pipeline;
}
