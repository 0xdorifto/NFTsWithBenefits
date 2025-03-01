import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import AgentHero from '@/components/agents/details/AgentHero';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import AgentSkillsSection from '@/components/agents/details/AgentSkillsSection';
import { toast } from 'react-hot-toast';
import AgentChatInterface from '@/components/agents/details/AgentChatInterface';
import { initSatellite, listAssets } from '@junobuild/core-peer';
import { useQuery } from '@tanstack/react-query';

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  description: string;
  experience: number;
  traits: Record<string, number>;
  skills: string[];
  specializations: string[];
  wallet_address: string;
  created_at: string;
  avatar_metadata?: {
    styleId: string;
    variation: string;
  };
  updated_at?: string;
  version?: string;
}

const AgentDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    (async () => {
      try {
        await initSatellite({
          satelliteId: process.env.NEXT_PUBLIC_SATELLITE_ID || "5ndk7-myaaa-aaaak-qcfmq-cai" // Replace with your actual satellite ID if needed
        });
      } catch (error) {
        console.error("Failed to initialize Juno satellite:", error);
        toast.error("Failed to connect to the network. Please try again later.");
      }
    })();
  }, []);

  const {data: agent, isLoading: loading} = useQuery({
    queryKey: ['agent', id],
    queryFn: async () => {
      return fetchAgent()
    }
  })

  const fetchAgent = async () => {
    if (!id) return;

    try {
      const response = await listAssets({
        collection: "agents",
        satellite: {
          satelliteId: process.env.NEXT_PUBLIC_SATELLITE_ID as string
        },
        filter: {
          matcher: {
            key: id as string
          }
        }
      });

      if (response.items.length === 0) {
        toast.error("Agent not found");
        return;
      }

      const assetItem = response.items[0];

      try {
        const agentDataResponse = await fetch(assetItem.downloadUrl);
        if (!agentDataResponse.ok) {
          throw new Error(`Failed to fetch agent data: ${agentDataResponse.statusText}`);
        }

        const agentData = await agentDataResponse.json();

        return agentData
      } catch (downloadError) {
        console.error('Error downloading agent data:', downloadError);
        toast.error('Failed to load agent details');
      }

    } catch (error: any) {
      console.error('Error fetching agent:', error);
      const errorMsg = error.response?.data?.message || 'Failed to load agent details';
      toast.error(errorMsg);
    }
  };


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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <AgentChatInterface id={id as string} agent={agent} />
          </div>

          <div className="lg:col-span-1">
            <AgentSkillsSection agent={agent} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(AgentDetailsPage), {
  ssr: false
});

const mockAgentId = "agent-0xD919D5ca385c3847B65405fF92Cb46667FDaac9C-1740713289286"

const mockAgent = {
  "id": "agent-0xD919D5ca385c3847B65405fF92Cb46667FDaac9C-1740713289286",
  "wallet_address": "0xD919D5ca385c3847B65405fF92Cb46667FDaac9C",
  "name": "Yo",
  "avatar": "data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%20%20%3CradialGradient%20id%3D%22faceGradientBear%22%20cx%3D%2250%25%22%20cy%3D%2250%25%22%20r%3D%2250%25%22%20fx%3D%2250%25%22%20fy%3D%2250%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23FC8BBE%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23F472B6%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2FradialGradient%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cfilter%20id%3D%22softShadowBear%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeGaussianBlur%20in%3D%22SourceAlpha%22%20stdDeviation%3D%223%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeOffset%20dx%3D%220%22%20dy%3D%222%22%20result%3D%22offsetblur%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeComponentTransfer%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CfeFuncA%20type%3D%22linear%22%20slope%3D%220.3%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FfeComponentTransfer%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeMerge%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CfeMergeNode%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CfeMergeNode%20in%3D%22SourceGraphic%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FfeMerge%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2Ffilter%3E%0A%20%20%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22chartGradientRed%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%220%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3A%23EF4444%3B%20stop-opacity%3A1%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3A%23EF4444%3B%20stop-opacity%3A0.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cfilter%20id%3D%22glowEffectRed%22%20x%3D%22-20%25%22%20y%3D%22-20%25%22%20width%3D%22140%25%22%20height%3D%22140%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeGaussianBlur%20stdDeviation%3D%222%22%20result%3D%22glow%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CfeMerge%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CfeMergeNode%20in%3D%22glow%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CfeMergeNode%20in%3D%22SourceGraphic%22%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FfeMerge%3E%0A%20%20%20%20%20%20%20%20%20%20%3C%2Ffilter%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%20%20%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23DB2777%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2235%22%20fill%3D%22url(%23faceGradientBear)%22%20filter%3D%22url(%23softShadowBear)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2235%22%20cy%3D%2245%22%20r%3D%226%22%20fill%3D%22white%22%20filter%3D%22url(%23softShadowBear)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2265%22%20cy%3D%2245%22%20r%3D%226%22%20fill%3D%22white%22%20filter%3D%22url(%23softShadowBear)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2235%22%20cy%3D%2245%22%20r%3D%222.5%22%20fill%3D%22%23000%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2265%22%20cy%3D%2245%22%20r%3D%222.5%22%20fill%3D%22%23000%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M30%2C40%20L40%2C55%20L50%2C35%20L60%2C65%20L70%2C45%22%20fill%3D%22none%22%20stroke%3D%22url(%23chartGradientRed)%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20filter%3D%22url(%23glowEffectRed)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M40%2C65%20Q50%2C60%2060%2C65%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Ccircle%20cx%3D%2270%22%20cy%3D%2245%22%20r%3D%222.5%22%20fill%3D%22%23FCA5A5%22%20filter%3D%22url(%23glowEffectRed)%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M30%2C39%20Q35%2C35%2040%2C39%22%20stroke%3D%22%23DB2777%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M60%2C39%20Q65%2C35%2070%2C39%22%20stroke%3D%22%23DB2777%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%2230%22%20y1%3D%2230%22%20x2%3D%2240%22%20y2%3D%2233%22%20stroke%3D%22%23DB2777%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cline%20x1%3D%2260%22%20y1%3D%2233%22%20x2%3D%2270%22%20y2%3D%2230%22%20stroke%3D%22%23DB2777%22%20stroke-width%3D%221.5%22%2F%3E%0A%20%20%20%20%20%20%3C%2Fsvg%3E",
  "avatar_metadata": {
    "styleId": "pink-degen",
    "variation": "Bearish"
  },
  "description": "Baddass Agent, the likes to go hard and fast. Crazy about adrenaline and speed. Loves to take risks and live on the edge.",
  "traits": [],
  "skills": [],
  "specializations": [],
  "experience": 0,
  "created_at": "2025-02-28T03:28:09.286Z",
  "updated_at": "2025-02-28T03:28:09.286Z",
  "version": "1.0.0"
}