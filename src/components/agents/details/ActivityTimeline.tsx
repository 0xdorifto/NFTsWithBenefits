import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'challenge' | 'training' | 'achievement';
  description: string;
  created_at: string;
  metadata?: Record<string, any>;
}

interface ActivityTimelineProps {
  agentId: string;
}

const ActivityTimeline = ({ agentId }: ActivityTimelineProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from('agent_activities')
          .select('*')
          .eq('agent_id', agentId)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setActivities(data || []);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [agentId]);

  if (loading) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/4 mb-6"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="mb-4">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>

      {activities.length === 0 ? (
        <p className="text-gray-400">No recent activities</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 border-l-2 border-purple-600 pl-4"
            >
              <div className="flex-1">
                <p className="text-white">{activity.description}</p>
                <p className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(activity.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityTimeline;
