export enum AgentArchetype {
  ANALYST = 'analyst',
  CREATIVE = 'creative',
  STRATEGIST = 'strategist'
}

export interface AgentTemplate {
  archetype: AgentArchetype;
  baseStats: AgentStats;
  defaultTraits: string[];
  specializations: string[];
  initPrompt: string;
}

export interface AgentCreationConfig {
  template: AgentTemplate;
  customTraits?: string[];
  focusAreas?: string[];
  preferredChallenges?: string[];
  trainingConfig: {
    initialDifficulty: number;
    learningRate: number;
    adaptationSpeed: number;
  };
}

export interface AgentEvolution {
  experiencePoints: number;
  learnedPatterns: Map<string, number>;
  challengeHistory: ChallengeResult[];
  specialtyProgress: Map<string, number>;
  adaptations: {
    traitShifts: Map<string, number>;
    learnedBehaviors: string[];
    performanceMetrics: Map<string, number>;
  };
}
