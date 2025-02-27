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
