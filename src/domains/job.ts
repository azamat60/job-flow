export type JobStatus = "pending" | "in_progress" | "completed" | "failed";

export interface Job {
  id: string;
  title: string;
  status: JobStatus;
  createdAt: Date;
}

export interface CreateJobInput {
  title: string;
}
