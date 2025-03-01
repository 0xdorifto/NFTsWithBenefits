import { Agent } from '@/pages/agents/[id]';
import React from 'react';
import { FaGraduationCap, FaBrain, FaStar } from 'react-icons/fa';


interface AgentSkillsSectionProps {
  agent: Agent;
}

const AgentSkillsSection: React.FC<AgentSkillsSectionProps> = ({ agent }) => {
  // Calculate knowledge level based on skills and specializations
  const knowledgeLevel = Math.min(10, Math.ceil((agent.skills.length + (agent.specializations?.length || 0) * 2) / 3));
  
  // Knowledge level descriptors
  const levelDescriptors = [
    "Just Born", "Learning Basics", "Curious Beginner", "Knowledge Seeker", 
    "Growing Mind", "Skilled Learner", "Knowledge Explorer", "Wisdom Gatherer", 
    "Expertise Developer", "Knowledgeable Being", "Evolved Intelligence"
  ];

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-lg">
      <h2 className="text-xl text-white font-bold mb-6 flex items-center">
        <FaBrain className="mr-2 text-blue-500" />
        Agent Knowledge
      </h2>

      {/* Knowledge Level */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Evolution Level</span>
          <span>{knowledgeLevel}/10</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600" 
            style={{ width: `${(knowledgeLevel / 10) * 100}%` }}
          />
        </div>
        <p className="text-gray-400 text-sm mt-1">{levelDescriptors[knowledgeLevel]}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-white text-md font-semibold mb-3 flex items-center">
          <FaGraduationCap className="mr-2 text-green-400" />
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {agent.skills.length > 0 ? (
            agent.skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">No skills learned yet. Teach your agent new skills!</p>
          )}
        </div>
      </div>

      {/* Specializations */}
      <div className="mb-6">
        <h3 className="text-white text-md font-semibold mb-3 flex items-center">
          <FaStar className="mr-2 text-yellow-400" />
          Specializations
        </h3>
        <div className="flex flex-wrap gap-2">
          {agent.specializations && agent.specializations.length > 0 ? (
            agent.specializations.map((spec, index) => (
              <span 
                key={index}
                className="bg-gray-800/60 border border-yellow-700/30 text-yellow-300 px-3 py-1 rounded-full text-xs"
              >
                {spec}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">No specializations yet. Help your agent master specific domains!</p>
          )}
        </div>
      </div>

      {/* Traits */}
      <div>
        <h3 className="text-white text-md font-semibold mb-3 flex items-center">
          <span className="mr-2">🧠</span>
          Personality Traits
        </h3>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(agent.traits) && agent.traits.length > 0 ? (
            agent.traits.map((trait, index) => (
              <span 
                key={index}
                className="bg-gray-800 text-blue-300 px-3 py-1 rounded-full text-xs"
              >
                {typeof trait === 'string' ? trait : trait.name}
              </span>
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">Personality still forming through interaction</p>
          )}
        </div>
      </div>
      
      {/* Learning tip */}
      <div className="mt-6 bg-blue-900/20 border border-blue-800 rounded-lg p-4">
        <p className="text-blue-300 text-sm">
          <strong>Tip:</strong> Chat with your agent and teach it new things to help it evolve. The more you interact, the more your agent will learn and grow!
        </p>
      </div>
    </div>
  );
};

export default AgentSkillsSection;
