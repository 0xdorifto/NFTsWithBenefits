import { useState } from 'react';
import { useAccount } from 'wagmi';
import React from 'react';
import { FaClock } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface AgentHeroProps {
  agent: {
    id: string;
    name: string;
    avatar: string;
    description: string;
    experience: number;
    wallet_address: string;
    created_at: string;
    nftTokenId?: number;
  };
  nftUrl?: string;
}

const AgentHero = ({ agent, nftUrl }: AgentHeroProps) => {
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{agent.name}</h1>
              
              <div className="flex items-center text-gray-400 text-xs mb-2">
                <FaClock className="mr-1" />
                <span>Created on {formattedDate}</span>
              </div>
            </div>
            
            {nftUrl && agent.nftTokenId && (
              <motion.a
                href={nftUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 
                           text-gray-200 text-sm font-medium rounded-lg border border-gray-700
                           transition-colors duration-200"
                title="View NFT on block explorer"
              >
                <ExternalLink size={14} className="text-gray-400" />
                <span>View NFT #{agent.nftTokenId}</span>
              </motion.a>
            )}
          </div>
          
          <p className="text-gray-300 text-sm">{agent.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AgentHero;
