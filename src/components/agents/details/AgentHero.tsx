import { useState } from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { shortenAddress } from '@/utils/formatting';
import React from 'react';
import { FaUserCircle, FaClock } from 'react-icons/fa';

interface AgentHeroProps {
  agent: {
    id: string;
    name: string;
    avatar: string;
    description: string;
    experience: number;
    wallet_address: string;
    created_at: string;
  };
}

const AgentHero = ({ agent }: AgentHeroProps) => {
  const { address } = useAccount();
  const [isTraining, setIsTraining] = useState(false);
  const isOwner = address?.toLowerCase() === agent.wallet_address?.toLowerCase();
  const formattedDate = new Date(agent.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800">
      <div className="px-6 py-4 relative flex items-start">
        {/* Avatar */}
        <div className="h-24 w-24 rounded-xl overflow-hidden border-2 border-gray-800 mr-4 flex-shrink-0">
          <img 
            src={agent.avatar} 
            alt={agent.name} 
            className="h-full w-full object-cover"
          />
        </div>
        
        {/* Agent info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white mb-1">{agent.name}</h1>
          
          <div className="flex items-center text-gray-400 text-xs mb-2">
            <FaClock className="mr-1" />
            <span>Created on {formattedDate}</span>
          </div>
          
          <p className="text-gray-300 text-sm">{agent.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentHero;
