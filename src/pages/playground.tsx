import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import AgentsSidebar from '@/components/playground/AgentsSidebar';
import ChatArea from '@/components/playground/ChatArea';
import { Agent } from '@/types/agent';

const PlaygroundPage = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black">
      <Head>
        <title>Playground - AI Agent Arena</title>
      </Head>

      <main className="flex-1 h-full flex overflow-hidden">
        <AgentsSidebar
          selectedAgent={selectedAgent}
          onSelectAgent={setSelectedAgent}
        />
        <ChatArea selectedAgent={selectedAgent} />
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(PlaygroundPage), { ssr: false });
