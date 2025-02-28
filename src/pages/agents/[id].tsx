import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import AgentHero from '@/components/agents/details/AgentHero';
import StatsPanel from '@/components/agents/details/StatsPanel';
import ActivityTimeline from '@/components/agents/details/ActivityTimeline';
import ChallengeHistory from '@/components/agents/details/ChallengeHistory';
import SocialSection from '@/components/agents/details/SocialSection';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface Agent {
  id: string;
  name: string;
  avatar: string;
  description: string;
  level: number;
  experience: number;
  traits: Record<string, number>;
  skills: string[];
  specializations: string[];
  wallet_address: string;
  created_at: string;
}

const AgentDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      if (!id) return;
  
      try {
        // TODO: Fetch agent data from cannister
        const data = { agent: {} as any }
        throw data;

        setAgent(data.agent);  // Assuming the response structure is { agent: { ... } }
      } catch (error: any) {
        console.error('Error fetching agent:', error);
        const errorMsg = error.response?.data?.message || 'Failed to load agent details';
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };
  
    // fetchAgent();
    setAgent({
      id: '1',
      name: 'Agent 1',
      avatar: 'https://i.pravatar.cc/300',
      description: 'This is a description of Agent 1',
      level: 1,
      experience: 0,
      traits: { trait1: 1, trait2: 2 },
      skills: ['skill1', 'skill2'],
      specializations: ['specialization1', 'specialization2'],
      wallet_address: '0x1234567890',
      created_at: new Date().toISOString()

    } as Agent)
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Agent not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black">
      <Head>
        <title>{agent.name}</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <AgentHero agent={agent} />



       
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(AgentDetailsPage), {
  ssr: false
});
