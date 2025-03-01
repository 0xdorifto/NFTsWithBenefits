import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Logo } from '../Logo';

const Navigation = () => {
  const router = useRouter();
  const { isConnected } = useAccount();
  
  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

      

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {isConnected && (
              <>
              <Link href="/agents">Agents</Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/agents/create')}
                className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all"
              >
                Create Agent
              </motion.button>
              </>
            )}
            
            <ConnectButton 
              showBalance={false}
              chainStatus="icon"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
