import { useState } from 'react';
import { AgentInfo } from '@/components/agent-lab/AgentInfo';
import { SkillTree } from '@/components/agent-lab/SkillTree';
import { TrainingArea } from '@/components/agent-lab/TrainingArea';
import { PerformanceMetrics } from '@/components/agent-lab/PerformanceMetrics';

export default function AgentLab() {
  const [agent, setAgent] = useState({
    name: '',
    level: 1,
    experience: 0,
    skills: [],
    stats: {
      successRate: 0,
      completedChallenges: 0,
      tokensEarned: 0
    }
  });

  return (
    <div className="min-h-screen p-4 bg-gray-900">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 space-y-4">
          <AgentInfo agent={agent} />
          <SkillTree agent={agent} onSkillUpdate={setAgent} />
        </div>
        <div className="col-span-8">
           <TrainingArea agent={agent} onTrainingComplete={setAgent} /> 
        </div>
        <div className="col-span-12">
           <PerformanceMetrics agent={agent} />
        </div>
      </div>
    </div>
  );
}
