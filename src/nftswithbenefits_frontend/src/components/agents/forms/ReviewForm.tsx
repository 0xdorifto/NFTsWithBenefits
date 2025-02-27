import { FC } from 'react';

interface ReviewFormProps {
  agentData: any;
}

const ReviewForm: FC<ReviewFormProps> = ({ agentData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Review Your Agent</h2>
      <pre className="bg-gray-800 p-4 rounded-lg text-gray-300">
        {JSON.stringify(agentData, null, 2)}
      </pre>
    </div>
  );
};

export default ReviewForm;
