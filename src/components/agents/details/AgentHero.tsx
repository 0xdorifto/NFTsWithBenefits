import { useState } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { shortenAddress } from '@/utils/formatting';

interface AgentHeroProps {
  agent: {
    id: string;
    name: string;
    avatar: string;
    description: string;
    level: number;
    experience: number;
    wallet_address: string;
  };
}

const AgentHero = ({ agent }: AgentHeroProps) => {
  const { address } = useAccount();
  const [isTraining, setIsTraining] = useState(false);
  const isOwner = address?.toLowerCase() === agent.wallet_address?.toLowerCase();

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-start gap-8">
        <div className="relative w-32 h-32">
          <Image
            src={agent.avatar || '/default-agent-avatar.png'}
            alt={agent.name}
            fill
            className="rounded-lg object-cover"
          />
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-gray-800" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{agent.name}</h1>
              <p className="text-gray-400">Owned by {shortenAddress(agent.wallet_address)}</p>
            </div>

            {isOwner && (
              <div className="flex gap-4">
                <button
                  onClick={() => setIsTraining(true)}
                  disabled={isTraining}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white disabled:opacity-50"
                >
                  Train Agent
                </button>
                <button className="px-4 py-2 border-2 border-white/20 rounded-lg text-white hover:bg-white/10">
                  Edit
                </button>
              </div>
            )}
          </div>

          <p className="mt-4 text-gray-300">{agent.description}</p>

      
        </div>
      </div>
    </div>
  );
};

export default AgentHero;
