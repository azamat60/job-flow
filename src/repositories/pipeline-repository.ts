import { randomUUID } from "node:crypto";
import { CreatePipelineInput, Pipeline } from "../domains/pipeline.js";

export interface PipelineRepository {
  create(input: CreatePipelineInput): Promise<Pipeline>;
  findById(id: string): Promise<Pipeline | undefined>;
  findAll(): Promise<Pipeline[]>;
}

export class InMemoryPipelineRepository implements PipelineRepository {
  private pipelines = new Map<string, Pipeline>();

  async create(input: CreatePipelineInput): Promise<Pipeline> {
    const pipeline: Pipeline = {
      id: randomUUID(),
      name: input.name,
      steps: input.steps.map((stepName) => ({
        id: randomUUID(),
        name: stepName,
      })),
    };
    this.pipelines.set(pipeline.id, pipeline);
    return pipeline;
  }

  async findById(id: string): Promise<Pipeline | undefined> {
    return this.pipelines.get(id);
  }

  async findAll(): Promise<Pipeline[]> {
    return Array.from(this.pipelines.values());
  }
}
