import React from 'react';
import { AgentData, AgentTrait, AgentSkill, AgentSpecialization } from '@/types/agent';
import { FiCpu, FiCode, FiFeather, FiDatabase, FiSettings } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

interface AgentPreviewProps {
  agentData: AgentData;
}

const AgentPreview: React.FC<AgentPreviewProps> = ({ agentData }) => {
  const {
    name,
    avatar,
    description,
    traits = [],
    skills = [],
    specializations = [],
  } = agentData;

  // Placeholder avatar if none provided
  const avatarSrc = avatar || 'https://via.placeholder.com/200x200?text=AI+Agent';

  // Format traits for display - handle both string[] and AgentTrait[] structures
  const renderTraits = () => {
    if (!traits || traits.length === 0) {
      return <p className="text-gray-400 italic">No traits selected</p>;
    }

    return (
      <div className="flex flex-wrap gap-2">
        {traits.map((trait, index) => {
          // Handle both simple strings and complex trait objects
          const traitName = typeof trait === 'string' ? trait : trait?.name || 'Unknown';
          const traitValue = typeof trait === 'object' && trait?.value !== undefined ? trait.value : 50;

          return (
            <div 
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-indigo-900/30 border border-indigo-400/30 rounded-md"
            >
              <FiFeather className="text-indigo-400" />
              <span className="text-white text-xs">{traitName}</span>
              {typeof trait === 'object' && trait?.value !== undefined && (
                <span className="ml-1 text-xs px-1 bg-indigo-500 rounded-full text-white">
                  {traitValue}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Format skills for display - handle both string[] and AgentSkill[] structures
  const renderSkills = () => {
    if (!skills || skills.length === 0) {
      return <p className="text-gray-400 italic">No skills selected</p>;
    }

    return (
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => {
          // Handle both simple strings and complex skill objects
          const skillName = typeof skill === 'string' ? skill : skill?.name || 'Unknown';
          const skillProficiency = typeof skill === 'object' && skill?.proficiency !== undefined ? skill.proficiency : 75;

          return (
            <div 
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-blue-900/30 border border-blue-400/30 rounded-md"
            >
              <FiCode className="text-blue-400" />
              <span className="text-white text-xs">{skillName}</span>
              {typeof skill === 'object' && skill?.proficiency !== undefined && (
                <span className="ml-1 text-xs px-1 bg-blue-500 rounded-full text-white">
                  {skillProficiency}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Format specializations for display - handle both string[] and AgentSpecialization[] structures
  const renderSpecializations = () => {
    if (!specializations || specializations.length === 0) {
      return <p className="text-gray-400 italic">No specializations selected</p>;
    }

    return (
      <div className="space-y-2">
        {specializations.map((spec, index) => {
          // Handle both simple strings and complex specialization objects
          const specName = typeof spec === 'string' ? spec : spec?.name || 'Unknown';
          const specDescription = typeof spec === 'object' && spec?.description ? spec.description : '';

          return (
            <div 
              key={index}
              className="p-2 bg-purple-900/30 border border-purple-400/30 rounded-md"
            >
              <div className="flex items-center gap-1">
                <FiCpu className="text-purple-400" />
                <span className="text-white text-sm font-medium">{specName}</span>
              </div>
              {specDescription && (
                <p className="mt-1 text-xs text-gray-300">{specDescription}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Debug section to help developers see what data is coming in
  const renderDebugInfo = () => {
    if (process.env.NODE_ENV !== 'development') return null;
    
    return (
      <div className="mt-4 p-2 bg-red-900/20 border border-red-500/30 rounded text-xs">
        <details>
          <summary className="cursor-pointer text-red-400 font-mono">Debug Data</summary>
          <pre className="mt-2 p-2 bg-black/50 rounded overflow-auto max-h-40 text-gray-400">
            {JSON.stringify({traits, skills, specializations}, null, 2)}
          </pre>
        </details>
      </div>
    );
  };

  return (
    <div className="sticky top-6 rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 border border-white/10 shadow-xl overflow-hidden">
      {/* Agent Card Header */}
      <div className="relative bg-gradient-to-r from-purple-700 to-blue-700 p-4">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="w-full h-full" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <h2 className="relative text-xl font-bold text-white">Agent Preview</h2>
      </div>

      <div className="p-4">
        {/* Identity Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0 relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
              <img 
                src={avatarSrc} 
                alt="Agent Avatar" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=AI';
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-500 p-1 rounded-full border-2 border-gray-800">
              <FaRobot className="text-white text-xs" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {name || 'Unnamed Agent'}
            </h3>
            <div className="inline-flex items-center text-xs px-2 py-0.5 bg-green-900/60 text-green-300 rounded-full">
              <FiSettings className="mr-1" /> NFT Agent
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <FiDatabase className="text-blue-400" />
            <h4 className="text-sm font-semibold text-white">Description</h4>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-lg p-3">
            <p className="text-sm text-gray-300">
              {description || 'This agent has no description yet.'}
            </p>
          </div>
        </div>

        {/* Traits Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <FiFeather className="text-indigo-400" />
              <h4 className="text-sm font-semibold text-white">Traits</h4>
            </div>
            <span className="text-xs text-gray-400">
              {Array.isArray(traits) ? traits.length : 0}/5
            </span>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-lg p-3">
            {renderTraits()}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <FiCode className="text-blue-400" />
              <h4 className="text-sm font-semibold text-white">Skills</h4>
            </div>
            <span className="text-xs text-gray-400">
              {Array.isArray(skills) ? skills.length : 0}/10
            </span>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-lg p-3">
            {renderSkills()}
          </div>
        </div>

        {/* Specializations Section */}
        <div className="mb-1">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <FiCpu className="text-purple-400" />
              <h4 className="text-sm font-semibold text-white">Specializations</h4>
            </div>
            <span className="text-xs text-gray-400">
              {Array.isArray(specializations) ? specializations.length : 0}/3
            </span>
          </div>
          <div className="bg-black/20 border border-white/10 rounded-lg p-3">
            {renderSpecializations()}
          </div>
        </div>

     
      </div>
      
      <div className="px-4 py-3 bg-black/30 border-t border-white/5">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>NFT-Powered Agent</span>
          <span>ICP Network</span>
        </div>
      </div>
    </div>
  );
};

export default AgentPreview;
