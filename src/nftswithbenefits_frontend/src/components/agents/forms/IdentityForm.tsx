import { FC } from 'react';
import { getRandomAvatar } from '@/constants/defaultAvatars';

interface IdentityFormProps {
  agentData: {
    name: string;
    avatar: string;
    description: string;
  };
  setAgentData: (data: any) => void;
}

const IdentityForm: FC<IdentityFormProps> = ({ agentData, setAgentData }) => {
  // useEffect(() => {
  //   if (!agentData.avatar) {
  //     setAgentData({
  //       ...agentData,
  //       avatar: getRandomAvatar()
  //     });
  //   }
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAgentData({
      ...agentData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Create Your Agent&apos;s Identity</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Agent Name
        </label>
        <input
          type="text"
          name="name"
          value={agentData.name}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter agent name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={agentData.description}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Describe your agent's purpose and personality"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Avatar URL
        </label>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            name="avatar"
            value={agentData.avatar}
            onChange={handleChange}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter avatar URL"
          />
          <button
            type="button"
            onClick={() => setAgentData({
              ...agentData,
              avatar: getRandomAvatar()
            })}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Random
          </button>
        </div>
        {agentData.avatar && (
          <div className="mt-2">
            <img 
              src={agentData.avatar} 
              alt="Agent avatar" 
              className="w-20 h-20 rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default IdentityForm;
