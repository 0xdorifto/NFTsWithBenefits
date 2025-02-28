export interface AgentStats {
  intelligence: number;
  creativity: number;
  problemSolving: number;
  memory: number;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  description: string;
  status?: 'active' | 'inactive';
  created_at: string;
  traits?: Record<string, number>;
  skills?: string[];
  specializations?: string[];
}

export interface AgentUpgrade {
  id: string;
  agentId: string;
  timestamp: Date;
  statsIncreased: Partial<AgentStats>;
  cost: number;
}

export interface ChallengeResult {
  challengeId: string;
  agentId: string;
  performance: number;
  experienceGained: number;
  timestamp: Date;
}

export interface AgentTrait {
  name: string;
  value: number;
}

export interface AgentSkill {
  name: string;
  proficiency: number;
}

export interface AgentSpecialization {
  name: string;
  description: string;
}

export interface AgentData {
  name: string;
  avatar: string;
  description: string;
  traits: AgentTrait[];
  skills: AgentSkill[];
  specializations: AgentSpecialization[];
}

export interface AgentMetadata extends AgentData {
  wallet_address: string;
  created_at: string;
  updated_at: string;
  version: string;
  fileUrl?: string;
}
