import { LineChart } from '@/components/ui/LineChart';
import { Card } from '@/components/ui/Card';

interface PerformanceData {
  date: string;
  successRate: number;
  tokensEarned: number;
}

interface PerformanceMetricsProps {
  historicalData?: PerformanceData[];
  challengeTypes?: {
    type: string;
    successRate: number;
  }[];
}

export function PerformanceMetrics({ 
  historicalData = [], 
  challengeTypes = [] 
}: PerformanceMetricsProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>

      {historicalData.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Card className="p-3">
            <LineChart
              data={historicalData}
              xKey="date"
              yKey="successRate"
              label="Success Rate"
            />
          </Card>
          <Card className="p-3">
            <LineChart
              data={historicalData}
              xKey="date"
              yKey="tokensEarned"
              label="Tokens Earned"
            />
          </Card>
        </div>
      )}

      {challengeTypes.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {challengeTypes.map((challenge) => (
            <div key={challenge.type} className="bg-gray-700 p-3 rounded">
              <p className="text-sm text-gray-400">{challenge.type}</p>
              <p className="text-xl font-bold text-white">
                {challenge.successRate}%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
