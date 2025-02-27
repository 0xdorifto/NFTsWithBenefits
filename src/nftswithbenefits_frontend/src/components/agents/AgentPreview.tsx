interface AgentPreviewProps {
  agentData: {
    name: string;
    avatar: string;
    description: string;
    traits: Record<string, number>;
    skills: string[];
    specializations: string[];
  };
}

const AgentPreview = ({ agentData }: AgentPreviewProps) => {
  return (
    <div className="sticky top-8 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <h2 className="text-xl font-bold text-white mb-4">Agent Preview</h2>
      
      {agentData.avatar && (
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
          <img src={agentData.avatar} alt="Agent avatar" className="w-full h-full object-cover" />
        </div>
      )}

      {agentData.name && (
        <h3 className="text-lg text-white text-center mb-2">{agentData.name}</h3>
      )}

      {agentData.description && (
        <p className="text-gray-300 text-sm mb-4">{agentData.description}</p>
      )}

      {Object.keys(agentData.traits).length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-white mb-2">Traits</h4>
          {Object.entries(agentData.traits).map(([trait, value]) => (
            <div key={trait} className="flex justify-between text-sm">
              <span className="text-gray-400">{trait}</span>
              <span className="text-white">{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Add more preview sections as needed */}
    </div>
  );
};

export default AgentPreview;
