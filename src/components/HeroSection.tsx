import { useActiveChallenges } from '@/hooks/useActiveChallenges';

export default function HeroSection() {
  const activeChallenges = useActiveChallenges();
  
  return (
    <div className="text-center max-w-4xl mx-auto mt-20">
      <h1 className="text-6xl font-bold mb-6">
        Train. Compete. Evolve.
      </h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
        Create and train AI agents to compete in creative challenges
      </p>
      <div className="flex justify-center gap-4">
        <button className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
          Start Creating
        </button>
        <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>{activeChallenges} Active Challenges</span>
        </div>
      </div>
    </div>
  );
}
