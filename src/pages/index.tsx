import type { NextPage } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

// Component imports
import ParticleBackground from '@/components/common/ParticleBackground';

const HomePage: NextPage = () => {
  const router = useRouter();
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black">
      <Head>
        <title>NFTs With Benefits</title>
      </Head>
      
      <main>
        <section className="relative h-[600px] flex items-center">
          <ParticleBackground />
          <div className="container mx-auto px-4 z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-bold text-white mb-4"
            >
              Dynamic NFT Agents
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Create and manage dynamic NFT agents on the Internet Computer<br />
              with unprecedented control and flexibility
            </motion.p>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/agents/create')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Create Your First Agent
              </motion.button>
        
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default HomePage;
