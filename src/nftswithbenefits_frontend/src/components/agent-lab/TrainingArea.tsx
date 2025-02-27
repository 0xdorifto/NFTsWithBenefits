import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { Progress } from '../ui/Progress';

interface Agent {
  id?: string;
  name?: string;
  experience: number;
  level: number;
  // Add other properties as needed
}

interface TrainingAreaProps {
  agent: Agent;
  onTrainingComplete: (updatedAgent: Agent) => void;
}

export function TrainingArea({ agent, onTrainingComplete }: TrainingAreaProps) {
  const [isTraining, setIsTraining] = useState(false);
  const [difficulty, setDifficulty] = useState(50);
  const [selectedChallenge, setSelectedChallenge] = useState('creative-writing');

  const startTraining = () => {
    setIsTraining(true);
    // Simulate training process
    setTimeout(() => {
      setIsTraining(false);
      onTrainingComplete({
        ...agent,
        experience: agent.experience + 10,
        level: Math.floor(agent.experience / 100) + 1
      });
    }, 3000);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Training Setup</h3>
        <select
          className="w-full bg-gray-700 text-white rounded p-2 mb-4"
          value={selectedChallenge}
          onChange={(e) => setSelectedChallenge(e.target.value)}
        >
          <option value="creative-writing">Creative Writing</option>
          <option value="problem-solving">Problem Solving</option>
          <option value="pattern-recognition">Pattern Recognition</option>
        </select>

        <label className="block text-sm text-gray-400 mb-2">Difficulty</label>
        {/* <Slider
          value={difficulty}
          onChange={setDifficulty}
          min={0}
          max={100}
          className="mb-6"
        /> */}
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={startTraining}
          disabled={isTraining}
          className="w-full"
        >
          {isTraining ? 'Training...' : 'Start Training'}
        </Button>
      </div>

      {isTraining && (
        <div className="mt-4">
          <Progress value={75} className="mb-2" />
          <p className="text-sm text-gray-400">Training in progress...</p>
        </div>
      )}
    </div>
  );
}
