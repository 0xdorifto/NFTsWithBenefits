import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { UserCircleIcon, UserPlusIcon, TrophyIcon, TeamIcon } from '@/components/icons';

interface SocialStats {
  followers: number;
  following: number;
  team_count: number;
  community_rating: number;
  recent_interactions: Array<{
    id: string;
    type: 'follow' | 'challenge' | 'team' | 'rate';
    user_name: string;
    created_at: string;
  }>;
}

interface SocialSectionProps {
  agentId: string;
}

const SocialSection = ({ agentId }: SocialSectionProps) => {
  const [stats, setStats] = useState<SocialStats | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchSocialStats = async () => {
  //     try {
  //       // Fetch followers count
  //       const { data: followersData, error: followersError } = await supabase
  //         .from('agent_followers')
  //         .select('count')
  //         .eq('agent_id', agentId);

  //       // Fetch following count
  //       const { data: followingData, error: followingError } = await supabase
  //         .from('agent_followers')
  //         .select('count')
  //         .eq('follower_id', agentId);

  //       // Fetch recent interactions
  //       const { data: interactionsData, error: interactionsError } = await supabase
  //         .from('agent_interactions')
  //         .select('*')
  //         .eq('agent_id', agentId)
  //         .order('created_at', { ascending: false })
  //         .limit(5);

  //       if (followersError || followingError || interactionsError) throw new Error('Failed to fetch social data');

  //       setStats({
  //         followers: followersData?.[0]?.count || 0,
  //         following: followingData?.[0]?.count || 0,
  //         team_count: 0, // To be implemented with teams feature
  //         community_rating: 4.5, // Placeholder for rating system
  //         recent_interactions: interactionsData || [],
  //       });
  //     } catch (error) {
  //       console.error('Error fetching social stats:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSocialStats();
  // }, [agentId]);

  if (loading) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/4 mb-6">
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-700 rounded"></div>
          ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white mb-6">Community Stats</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <UserCircleIcon className="w-5 h-5 text-purple-400" />
            <span className="text-white font-semibold">Followers</span>
          </div>
          <p className="text-2xl text-white">{stats.followers}</p>
        </div>

        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <UserPlusIcon className="w-5 h-5 text-blue-400" />
            <span className="text-white font-semibold">Following</span>
          </div>
          <p className="text-2xl text-white">{stats.following}</p>
        </div>

        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TeamIcon className="w-5 h-5 text-green-400" />
            <span className="text-white font-semibold">Teams</span>
          </div>
          <p className="text-2xl text-white">{stats.team_count}</p>
        </div>

        <div className="bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrophyIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">Rating</span>
          </div>
          <p className="text-2xl text-white">{stats.community_rating.toFixed(1)}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        {stats.recent_interactions.length === 0 ? (
          <p className="text-gray-400">No recent interactions</p>
        ) : (
          <div className="space-y-3">
            {stats.recent_interactions.map((interaction) => (
              <div
                key={interaction.id}
                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
              >
                <div>
                  <p className="text-white">{interaction.user_name}</p>
                  <p className="text-sm text-gray-400">
                    {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                  </p>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(interaction.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialSection;
