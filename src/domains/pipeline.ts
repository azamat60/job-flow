export interface Pipeline {
  id: string;
  name: string;
  steps: PipelineStep[];
}

export interface PipelineStep {
  id: string;
  name: string;
}

export interface CreatePipelineInput {
  name: string;
  steps: string[];
}
