export type LLMModel = 'gpt-4' | 'claude-2';

export interface MemoryBuffer {
  shortTerm: string[];
  longTerm: Map<string, number>;
  addMemory: (memory: string, importance: number) => void;
  retrieveRelevant: (context: string) => string[];
}

export interface PersonalityMatrix {
  traits: string[];
  style: string;
  preferences: Map<string, number>;
  evolve: (experience: Experience) => void;
}

export interface Experience {
  type: string;
  outcome: number;
  learnings: string[];
  timestamp: Date;
}

export interface AgentBrain {
  model: LLMModel;
  memory: MemoryBuffer;
  personality: PersonalityMatrix;
  process: (input: string, context: string) => Promise<string>;
  learn: (experience: Experience) => void;
}
