import { Badge } from '@/components/ui/Badge';
import { Tooltip } from '@/components/ui/Tooltip';

interface Skill {
  id: string;
  name: string;
  description: string;
  cost: number;
  isUnlocked: boolean;
  dependencies: string[];
}

interface SkillTreeProps {
  skills?: Skill[];
  onSkillUnlock: (skillId: string) => void;
  availableTokens: number;
}

export function SkillTree({ 
  skills = [], 
  onSkillUnlock, 
  availableTokens 
}: SkillTreeProps) {
  if (!skills.length) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Skill Tree</h3>
          <Badge variant="secondary">{availableTokens} ARENA</Badge>
        </div>
        <p className="text-gray-400 text-center">No skills available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Skill Tree</h3>
        <Badge variant="secondary">{availableTokens} ARENA</Badge>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {skills.map((skill) => (
          <Tooltip key={skill.id} content={skill.description}>
            <div
              className={`p-3 rounded cursor-pointer transition-colors ${
                skill.isUnlocked ? 'bg-blue-600' : 'bg-gray-700'
              }`}
              onClick={() => !skill.isUnlocked && onSkillUnlock(skill.id)}
            >
              <p className="text-sm text-white font-medium">{skill.name}</p>
              <p className="text-xs text-gray-400">{skill.cost} ARENA</p>
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
