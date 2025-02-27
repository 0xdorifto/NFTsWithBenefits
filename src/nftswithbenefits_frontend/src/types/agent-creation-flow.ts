export interface AgentCreationInput {
  name: string;
  personalityTraits: string[];
  skills: string[];
  preferredChallenges: string[];
}

export interface AgentGenerationConfig {
  basePrompt: string;
  temperature: number;
  maxTokens: number;
  personalityModifiers: Record<string, number>;
}

export interface AgentInitializationResult {
  id: string;
  config: AgentCreationInput;
  generatedPersonality: string;
  baseStats: {
    intelligence: number;
    creativity: number;
    problemSolving: number;
    adaptability: number;
  };
  specialAbilities: string[];
}

export type AgentCreationStep = 
  | 'name'
  | 'personality'
  | 'skills'
  | 'preferences'
  | 'confirmation';

export interface CreationProgress {
  currentStep: AgentCreationStep;
  completedSteps: AgentCreationStep[];
  canProceed: boolean;
}
