import React from 'react';
import { FaBrain, FaLightbulb, FaChartLine } from 'react-icons/fa';
import clsx from 'clsx';

interface AgentSkillsSectionProps {
  agent: {
    traits: Record<string, number>;
    skills: string[];
    specializations: string[];
  };
}

const AgentSkillsSection: React.FC<AgentSkillsSectionProps> = ({ agent }) => {
  const { traits, skills, specializations } = agent;

  // Convert traits to an array for easier rendering
  const traitsList = Object.entries(traits).map(([name, value]) => ({
    name,
    value,
    // Determine color based on trait value
    color: value >= 90 ? 'bg-purple-500' : 
           value >= 80 ? 'bg-blue-500' : 
           value >= 70 ? 'bg-green-500' : 
           value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
  }));

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <FaBrain className="mr-2 text-blue-400" /> Agent Capabilities
      </h2>

      {/* Traits Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
          <FaChartLine className="mr-2" /> Core Traits
        </h3>
        <div className="space-y-4">
          {traitsList.map((trait) => (
            <div key={trait.name} className="space-y-1">
              <div className="flex justify-between text-gray-300">
                <span className="capitalize">{trait.name}</span>
                <span className="font-semibold">{trait.value}/100</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={clsx("h-full rounded-full", trait.color)} 
                  style={{ width: `${trait.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
          <FaLightbulb className="mr-2" /> Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span 
              key={skill} 
              className="px-3 py-1 bg-blue-900/50 border border-blue-700 rounded-full text-blue-300 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Specializations Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
          <FaLightbulb className="mr-2" /> Specializations
        </h3>
        <div className="flex flex-wrap gap-2">
          {specializations.map((spec) => (
            <span 
              key={spec} 
              className="px-3 py-1 bg-purple-900/50 border border-purple-700 rounded-full text-purple-300 text-sm"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentSkillsSection;
