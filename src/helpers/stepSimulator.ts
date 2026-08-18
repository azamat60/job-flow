import type { JobStep } from "../domains/job.js";

export const delay = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

export type StepRunner = (step: JobStep) => Promise<void>;

export const simulateStep: StepRunner = async () => {
  await delay(1_000);
};
