import { FC } from 'react';
import { AGENT_SPECIALIZATIONS } from '@/constants/agentSpecializations';

interface SpecializationFormProps {
  agentData: {
    specializations: string[];
  };
  setAgentData: (data: any) => void;
}

const SpecializationForm: FC<SpecializationFormProps> = ({ agentData, setAgentData }) => {
  const handleSpecializationChange = (specializationId: string) => {
    const currentSpecializations = agentData.specializations;
    const newSpecializations = currentSpecializations.includes(specializationId)
      ? currentSpecializations.filter(id => id !== specializationId)
      : currentSpecializations.length < 2
        ? [...currentSpecializations, specializationId]
        : currentSpecializations;

    setAgentData({
      ...agentData,
      specializations: newSpecializations
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Choose Specializations</h2>
      <p className="text-gray-400 mb-4">Select up to 2 specializations that define your agent&apos;s focus areas.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {AGENT_SPECIALIZATIONS.map((spec) => (
          <button
            key={spec.id}
            onClick={() => handleSpecializationChange(spec.id)}
            disabled={agentData.specializations.length >= 2 && !agentData.specializations.includes(spec.id)}
            className={`p-4 rounded-lg text-left transition-colors
              ${agentData.specializations.includes(spec.id)
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
              ${agentData.specializations.length >= 2 && !agentData.specializations.includes(spec.id)
                ? 'opacity-50 cursor-not-allowed'
                : ''}`}
          >
            <div className="font-medium">{spec.label}</div>
            <div className="text-sm mt-1 opacity-80">{spec.description}</div>
          </button>
        ))}
      </div>

      {agentData.specializations.length > 0 && (
        <div className="mt-4 text-sm text-gray-400">
          Selected Specializations: {agentData.specializations.length}/2
        </div>
      )}
    </div>
  );
};

export default SpecializationForm;
