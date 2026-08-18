import { randomUUID } from "node:crypto";
import { Job, CreateJobInput } from "../domains/job.js";

export interface JobRepository {
  create(input: CreateJobInput): Promise<Job>;
  findById(id: string): Promise<Job | undefined>;
  findAll(): Promise<Job[]>;
  save(job: Job): Promise<void>;
}

export class InMemoryJobRepository implements JobRepository {
  private jobs = new Map<string, Job>();

  async create(input: CreateJobInput): Promise<Job> {
    const job: Job = {
      id: randomUUID(),
      name: input.name,
      pipelineId: input.pipeline.id,
      status: "queued",
      createdAt: new Date(),
      steps: input.pipeline.steps.map((step) => ({
        id: randomUUID(),
        name: step.name,
        status: "pending",
      })),
    };
    this.jobs.set(job.id, job);
    return job;
  }

  async findById(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async findAll(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async save(job: Job): Promise<void> {
    this.jobs.set(job.id, job);
  }
}
