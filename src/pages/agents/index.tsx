import { useEffect, useState } from 'react';
import { initSatellite, listAssets } from '@junobuild/core-peer';
import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Agent } from './[id]';
import { useAccount } from 'wagmi';

// Components
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Client-side only wallet connection button
const WalletButton = dynamic(
  () => import('@/components/common/WalletButton'),
  { ssr: false }
);

const AgentsPage = () => {
  const router = useRouter();
  const { address, isConnected, isConnecting } = useAccount();

  useEffect(() => {
    (async () => {
      try {
        await initSatellite({
          satelliteId: process.env.NEXT_PUBLIC_SATELLITE_ID || "5ndk7-myaaa-aaaak-qcfmq-cai"
        });
      } catch (error) {
        console.error("Failed to initialize Juno satellite:", error);
        toast.error("Failed to connect to the network. Please try again later.");
      }
    })();
  }, []);

  const { data: agents, isLoading, isError } = useQuery({
    queryKey: ['agents', address],
    queryFn: fetchAgents,
    enabled: !!address && isConnected,
  });

  async function fetchAgents() {
    try {
      const response = await listAssets({
        collection: "agents",
        satellite: {
          satelliteId: process.env.NEXT_PUBLIC_SATELLITE_ID as string
        }
      });

      if (response.items.length === 0) {
        return [];
      }

      const agentPromises = response.items.map(async (assetItem) => {
        try {
          const agentDataResponse = await fetch(assetItem.downloadUrl);
          
          if (!agentDataResponse.ok) {
            throw new Error(`Failed to fetch agent data: ${agentDataResponse.statusText}`);
          }
          
          const agentData = await agentDataResponse.json();
          return {...agentData, id: assetItem.name};
        } catch (downloadError) {
          console.error('Error downloading agent data:', downloadError);
          return null;
        }
      });

      const agentsData = await Promise.all(agentPromises);
      
      // Filter agents to only show ones matching the connected wallet address
      return agentsData
        .filter(agent => agent !== null && agent.wallet_address === address);
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast.error('Failed to load agents');
      throw error;
    }
  }

  const handleCreateAgent = () => {
    router.push('/agents/create');
  };

  // If wallet is connecting, show loading spinner
  if (isConnecting) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <LoadingSpinner />
          <p className="text-white mt-4">Connecting wallet...</p>
        </div>
      </div>
    );
  }

  // If not connected, prompt to connect wallet
  if (!isConnected || !address) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black">
        <Head>
          <title>Your AI Agents</title>
          <meta name="description" content="View your created AI agents" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your AI Agents</h1>
              <p className="text-gray-300">Connect your wallet to view your agents</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center h-[40vh] bg-gray-800/30 rounded-xl p-8">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl text-white font-medium mb-2">Wallet Connection Required</h3>
            <p className="text-gray-400 text-center mb-6">Please connect your wallet to access your agents</p>
            <WalletButton />
          </div>
        </main>
      </div>
    );
  }

  // Loading state after wallet is connected
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-4">
        <div className="text-red-500 text-xl mb-4">Error loading agents</div>
        <button 
          onClick={() => router.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black">
      <Head>
        <title>Your AI Agents</title>
        <meta name="description" content="Manage and interact with your AI agents" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Your AI Agents</h1>
            <p className="text-gray-300">Manage and interact with your AI personas</p>
          </div>

          <button
            onClick={handleCreateAgent}
            className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-600 transition-all flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Agent
          </button>
        </div>

        {agents && agents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {agents.map((agent: Agent) => (
              <AgentCard key={agent.id || Math.random().toString()} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[40vh] bg-gray-800/30 rounded-xl p-8">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-xl text-white font-medium mb-2">No agents found</h3>
            <p className="text-gray-400 text-center mb-6">Create your first AI agent to get started</p>
            <button
              onClick={handleCreateAgent}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white hover:from-purple-700 hover:to-blue-600 transition-all"
            >
              Create Agent
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

interface AgentCardProps {
  agent: Agent;
}

// AgentCard component stays the same
const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <Link href={`/agents/${agent.id}`} className="block">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-lg hover:shadow-purple-500/10 transition-all hover:translate-y-[-4px] border border-gray-700/50 h-full">
        <div className="aspect-square w-full overflow-hidden bg-gray-900 relative">
          {agent.avatar ? (
            <img 
              src={agent.avatar} 
              alt={agent.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-blue-900/50">
              <span className="text-4xl">🤖</span>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <h3 className="text-xl font-bold text-white truncate">{agent.name}</h3>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-gray-300 line-clamp-2 h-12 mb-4">{agent.description}</p>
          
          {/* Skills/Traits preview */}
          <div className="flex flex-wrap gap-1">
            {agent.traits && agent.traits.length > 0 ? (
              Object.values(agent.traits).slice(0, 3).map((trait, index) => (
                <span key={index} className="px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-full">
                  {typeof trait === 'string' ? trait : Object.keys(trait)[0]}
                </span>
              ))
            ) : agent.skills && agent.skills.length > 0 ? (
              agent.skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded-full">
                  {skill}
                </span>
              ))
            ) : (
              <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                New Agent
              </span>
            )}
            
            {((agent.traits?.length || 0) + (agent.skills?.length || 0)) > 3 && (
              <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">
                +more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default dynamic(() => Promise.resolve(AgentsPage), {
  ssr: false
});
