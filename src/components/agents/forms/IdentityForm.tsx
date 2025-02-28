import { FC, useState, useEffect } from 'react';
import { getRandomAvatar, getAllAvatars, AvatarChoice } from '@/constants/avatars';
import { FiRefreshCw } from 'react-icons/fi';

interface IdentityFormProps {
  agentData: {
    name: string;
    avatar: string;
    description: string;
    avatarMetadata?: {
      styleId: string;
      variation: string;
    };
  };
  setAgentData: (data: any) => void;
}

const IdentityForm: FC<IdentityFormProps> = ({ agentData, setAgentData }) => {
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [availableAvatars, setAvailableAvatars] = useState<AvatarChoice[]>([]);

  useEffect(() => {
    setAvailableAvatars(getAllAvatars());
    
    if (!agentData.avatar) {
      const randomAvatar = getRandomAvatar();
      setAgentData({
        ...agentData,
        avatar: randomAvatar.dataUrl,
        avatarMetadata: {
          styleId: randomAvatar.style,
          variation: randomAvatar.variation
        }
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAgentData({
      ...agentData,
      [e.target.name]: e.target.value
    });
  };

  const handleRandomAvatar = () => {
    const randomAvatar = getRandomAvatar();
    setAgentData({
      ...agentData,
      avatar: randomAvatar.dataUrl,
      avatarMetadata: {
        styleId: randomAvatar.style,
        variation: randomAvatar.variation
      }
    });
  };

  const handleSelectAvatar = (avatar: AvatarChoice) => {
    setAgentData({
      ...agentData,
      avatar: avatar.dataUrl,
      avatarMetadata: {
        styleId: avatar.style,
        variation: avatar.variation
      }
    });
    setShowAvatarPicker(false);
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
          Avatar
        </label>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 border-2 border-purple-500 rounded-lg overflow-hidden bg-gray-800">
              {agentData.avatar && (
                <img 
                  src={agentData.avatar} 
                  alt="Agent avatar" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleRandomAvatar}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <FiRefreshCw className="animate-spin-once" />
                Random Avatar
              </button>
              <button
                type="button"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="flex items-center gap-2 px-4 py-2 border border-purple-500 text-purple-300 rounded-lg hover:bg-purple-900/30 transition-colors"
              >
                Browse Avatars
              </button>
            </div>
          </div>

          {showAvatarPicker && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mt-2">
              <h3 className="text-white font-medium mb-3">Select an Avatar Style</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {availableAvatars.map((avatar) => (
                  <div 
                    key={avatar.id}
                    onClick={() => handleSelectAvatar(avatar)}
                    className="cursor-pointer hover:scale-105 transition-transform"
                  >
                    <div className="w-full aspect-square border-2 border-gray-700 hover:border-purple-500 rounded-lg overflow-hidden">
                      <img 
                        src={avatar.dataUrl} 
                        alt={avatar.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-gray-300 mt-1 text-center truncate">{avatar.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentityForm;
