import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Challenge {
  id: string;
  type: string;
  result: 'victory' | 'defeat' | 'draw';
  score: number;
  opponent_name?: string;
  created_at: string;
}

interface ChallengeHistoryProps {
  agentId: string;
}

const ChallengeHistory = ({ agentId }: ChallengeHistoryProps) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data, error } = await supabase
          .from('agent_challenges')
          .select('*')
          .eq('agent_id', agentId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setChallenges(data || []);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [agentId]);

  const filteredChallenges = challenges.filter((challenge) => {
    if (filter === 'all') return true;
    return challenge.result === filter;
  });

  if (loading) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/4 mb-6"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Challenge History</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-700 text-white rounded-lg px-3 py-1"
        >
          <option value="all">All</option>
          <option value="victory">Victories</option>
          <option value="defeat">Defeats</option>
          <option value="draw">Draws</option>
        </select>
      </div>

      {filteredChallenges.length === 0 ? (
        <p className="text-gray-400">No challenges found</p>
      ) : (
        <div className="space-y-4">
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
            >
              <div>
                <p className="text-white font-medium">{challenge.type}</p>
                <p className="text-sm text-gray-400">
                  vs {challenge.opponent_name || 'Training Bot'}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`font-medium ${
                    challenge.result === 'victory'
                      ? 'text-green-400'
                      : challenge.result === 'defeat'
                      ? 'text-red-400'
                      : 'text-yellow-400'
                  }`}
                >
                  {challenge.result.charAt(0).toUpperCase() +
                    challenge.result.slice(1)}
                </p>
                <p className="text-sm text-gray-400">Score: {challenge.score}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChallengeHistory;
