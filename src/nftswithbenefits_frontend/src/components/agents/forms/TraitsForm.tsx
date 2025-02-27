import { FC } from 'react';
import { PERSONALITY_TRAITS, AGENT_SKILLS } from '@/constants/agentTraits';

interface TraitsFormProps {
  agentData: {
    traits: string[];
    skills: string[];
  };
  setAgentData: (data: any) => void;
}

const TraitsForm: FC<TraitsFormProps> = ({ agentData, setAgentData }) => {
  const handleSelectionChange = (type: 'traits' | 'skills', value: string) => {
    const currentSelection = agentData[type];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter(item => item !== value)
      : currentSelection.length < 3
        ? [...currentSelection, value]
        : currentSelection;

    setAgentData({
      ...agentData,
      [type]: newSelection
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Define Agent Traits</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Personality Traits (Select up to 3)
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {PERSONALITY_TRAITS.map((trait) => (
            <button
              key={trait.id}
              onClick={() => handleSelectionChange('traits', trait.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${agentData.traits.includes(trait.id)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                ${agentData.traits.length >= 3 && !agentData.traits.includes(trait.id)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''}`}
              disabled={agentData.traits.length >= 3 && !agentData.traits.includes(trait.id)}
            >
              {trait.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Skills (Select up to 3)
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {AGENT_SKILLS.map((skill) => (
            <button
              key={skill.id}
              onClick={() => handleSelectionChange('skills', skill.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${agentData.skills.includes(skill.id)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                ${agentData.skills.length >= 3 && !agentData.skills.includes(skill.id)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''}`}
              disabled={agentData.skills.length >= 3 && !agentData.skills.includes(skill.id)}
            >
              {skill.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {agentData.traits.length > 0 && (
            <div className="text-sm text-gray-400">
              Selected Traits: {agentData.traits.length}/3
            </div>
          )}
          {agentData.skills.length > 0 && (
            <div className="text-sm text-gray-400">
              Selected Skills: {agentData.skills.length}/3
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TraitsForm;
