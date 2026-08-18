import type { JobRepository } from "../repositories/job-repository.js";
import { simulateStep, type StepRunner } from "../helpers/stepSimulator.js";
import { Job, JobStep } from "../domains/job.js";

const DIVIDER = "*".repeat(100);

export class JobExecutor {
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly runStep: StepRunner = simulateStep,
  ) {}

  async execute(jobId: string) {
    console.log("Executing job: ", jobId);
    console.log(DIVIDER);
    const job = await this.jobRepository.findById(jobId);

    if (!job || job.status !== "queued") {
      return;
    }
    console.log("Job status: ", job.status);
    console.log(DIVIDER);

    job.status = "in_progress";
    job.startedAt = new Date();
    await this.jobRepository.save(job);
    console.log("Job status: ", job.status);
    console.log(DIVIDER);
    for (const step of job.steps) {
      console.log("Step status: ", step.status);
      console.log(DIVIDER);
      const succeeded = await this.executeStep(job, step);
      console.log("Step status: ", step.status);
      console.log(DIVIDER);
      if (!succeeded) {
        return;
      }
    }

    job.status = "completed";
    job.finishedAt = new Date();
    await this.jobRepository.save(job);
    console.log("Job status: ", job.status);
  }

  private async executeStep(job: Job, step: JobStep): Promise<boolean> {
    step.status = "running";
    step.startedAt = new Date();
    await this.jobRepository.save(job);

    try {
      await this.runStep(step);

      step.status = "completed";
      step.finishedAt = new Date();
      await this.jobRepository.save(job);

      return true;
    } catch {
      step.status = "failed";
      step.finishedAt = new Date();
      job.status = "failed";
      job.finishedAt = new Date();
      await this.jobRepository.save(job);

      return false;
    }
  }
}
