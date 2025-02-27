import { useState } from 'react';
import { Slider } from '@/components/ui/Slider';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface AgentTrainingProps {
  onStartTraining: (difficulty: number) => void;
  onStopTraining: () => void;
  isTraining: boolean;
  currentProgress: number;
}

export function AgentTraining({ onStartTraining, onStopTraining, isTraining, currentProgress }: AgentTrainingProps) {
  const [difficulty, setDifficulty] = useState(50);

  return (
    <Card className="p-4 bg-gray-800">
      <h3 className="text-lg font-semibold text-white mb-4">Training Area</h3>
      
      <div className="mb-4">
        <label className="text-sm text-gray-400">Difficulty Level</label>
        <Slider
          value={[difficulty]}
          onValueChange={(value) => setDifficulty(value[0])}
          min={1}
          max={100}
          step={1}
          disabled={isTraining}
        />
      </div>

      <div className="mb-4">
        <div className="h-2 bg-gray-700 rounded">
          <div 
            className="h-full bg-blue-500 rounded transition-all duration-300"
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>

      <Button 
        onClick={() => isTraining ? onStopTraining() : onStartTraining(difficulty)}
        variant={isTraining ? "destructive" : "default"}
        className="w-full"
      >
        {isTraining ? "Stop Training" : "Start Training"}
      </Button>
    </Card>
  );
}
