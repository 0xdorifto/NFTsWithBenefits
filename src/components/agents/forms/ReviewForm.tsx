import { FC, useState } from 'react';
import { FiCopy, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { AgentData } from '@/types/agent';

interface ReviewFormProps {
  agentData: AgentData;
  onPrevStep?: () => void;
  onSubmit?: () => void;
}

const ReviewForm: FC<ReviewFormProps> = ({ agentData, onPrevStep, onSubmit }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Format JSON with proper indentation for better readability
  const formattedJson = JSON.stringify(agentData, null, 2);
  
  // Function to copy JSON to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  const hasRequiredFields = agentData.name && agentData.description;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Review Your Agent</h2>
        {!hasRequiredFields && (
          <div className="flex items-center gap-2 text-amber-400 text-sm">
            <FiAlertTriangle className="flex-shrink-0" />
            <span>Missing required fields</span>
          </div>
        )}
      </div>
      
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 flex justify-between items-center">
          <div className="text-gray-300 font-mono text-sm">agent-data.json</div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-xs transition-colors"
            title="Copy to clipboard"
          >
            {copySuccess ? (
              <>
                <FiCheck className="text-green-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <FiCopy />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="relative">
          <pre 
            className="p-4 overflow-x-auto font-mono text-sm text-green-300 bg-gray-900 max-h-96 scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700"
            style={{ 
              lineHeight: '1.5',
              textShadow: '0 0 5px rgba(26, 217, 148, 0.1)'
            }}
          >
            {formattedJson}
          </pre>
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Optional action buttons */}
      {(onPrevStep || onSubmit) && (
        <div className="flex justify-between pt-4 border-t border-gray-700">
          {onPrevStep && (
            <button
              type="button"
              onClick={onPrevStep}
              className="px-4 py-2 text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              Back
            </button>
          )}
          {onSubmit && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!hasRequiredFields}
              className={`px-6 py-2 text-white rounded-md transition-colors ${
                !hasRequiredFields 
                  ? 'bg-green-800/50 cursor-not-allowed' 
                  : 'bg-green-700 hover:bg-green-600'
              }`}
            >
              Create Agent NFT
            </button>
          )}
        </div>
      )}

      {/* Tips section */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 text-sm text-blue-200">
        <p className="font-semibold mb-1">💡 Tips</p>
        <ul className="list-disc list-inside space-y-1 text-blue-300">
          <li>Review all agent properties carefully before minting</li>
          <li>Required fields: name and description</li>
          <li>You can copy this JSON data for your records</li>
        </ul>
      </div>
    </div>
  );
};

export default ReviewForm;
