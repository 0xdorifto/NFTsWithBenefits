import { useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

interface StatsPanelProps {
  agent: {
    traits: Record<string, number>;
    skills: string[];
    specializations: string[];
    level: number;
    experience: number;
  };
}

const StatsPanel = ({ agent }: StatsPanelProps) => {
  const chartData = useMemo(() => {
    return Object.entries(agent.traits).map(([name, value]) => ({
      trait: name,
      value: value,
    }));
  }, [agent.traits]);

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-white mb-6">Agent Stats</h2>

      <div className="h-64 -ml-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <PolarGrid stroke="#ffffff20" />
            <PolarAngleAxis
              dataKey="trait"
              tick={{ fill: '#ffffff80' }}
            />
            <Radar
              name="Stats"
              dataKey="value"
              fill="#8b5cf680"
              fillOpacity={0.6}
              stroke="#8b5cf6"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <h3 className="text-white font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {/* {agent.skills?.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm"
            >
              {skill}
            </span>
          ))} */}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-white font-semibold mb-2">Specializations</h3>
        <div className="flex flex-wrap gap-2">
          {/* {agent.specializations?.map((spec) => (
            <span
              key={spec}
              className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
            >
              {spec}
            </span>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
