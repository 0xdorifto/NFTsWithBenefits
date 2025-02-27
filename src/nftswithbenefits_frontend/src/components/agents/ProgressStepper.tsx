import { CheckIcon } from '@heroicons/react/20/solid';

interface ProgressStepperProps {
  steps: string[];
  currentStep: number;
}

const ProgressStepper = ({ steps, currentStep }: ProgressStepperProps) => {
  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="relative pt-4 pb-8">
      <div className="absolute h-1 bg-gray-700 w-full rounded top-7">
        <div 
          className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300
                ${index <= currentStep 
                  ? 'bg-purple-600 border-purple-600' 
                  : 'bg-gray-700 border-gray-600'}`}
            >
              {index < currentStep ? (
                <CheckIcon className="w-5 h-5 text-white" />
              ) : (
                <span className="text-white">{index + 1}</span>
              )}
            </div>
            <span className="mt-2 text-sm text-gray-300">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressStepper;
