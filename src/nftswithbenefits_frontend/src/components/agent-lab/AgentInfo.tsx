import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

interface AgentInfoProps {
  agent: {
    name: string;
    level: number;
    experience: number;
    stats: {
      successRate: number;
      completedChallenges: number;
      tokensEarned: number;
    };
  };
}

export function AgentInfo({ agent }: AgentInfoProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full" /> {/* Avatar placeholder */}
        <div>
          <h2 className="text-xl font-bold text-white">{agent.name || 'Unnamed Agent'}</h2>
          <p className="text-gray-400">Level {agent.level}</p>
        </div>
      </div>

      <Progress value={agent.experience % 100} className="mb-4" />

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-3 rounded">
          <p className="text-sm text-gray-400">Success Rate</p>
          <p className="text-xl font-bold text-white">{agent.stats.successRate}%</p>
        </div>
        <div className="bg-gray-700 p-3 rounded">
          <p className="text-sm text-gray-400">Challenges</p>
          <p className="text-xl font-bold text-white">{agent.stats.completedChallenges}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge>Creative</Badge>
        <Badge>Problem Solver</Badge>
        <Badge>Fast Learner</Badge>
      </div>
    </div>
  );
}
