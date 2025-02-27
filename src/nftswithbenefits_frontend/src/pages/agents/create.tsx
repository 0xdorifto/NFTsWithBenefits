import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProgressStepper from '@/components/agents/ProgressStepper';
import AgentPreview from '@/components/agents/AgentPreview';
import IdentityForm from '@/components/agents/forms/IdentityForm';
import TraitsForm from '@/components/agents/forms/TraitsForm';
import SpecializationForm from '@/components/agents/forms/SpecializationForm';
import ReviewForm from '@/components/agents/forms/ReviewForm';
import dynamic from 'next/dynamic';
import { useAccount } from 'wagmi';
import axios from 'axios';

// Client-side only wallet connection button
const WalletButton = dynamic(
  () => import('@/components/common/WalletButton'),
  { ssr: false }
);

interface FormErrors {
  name?: string;
  description?: string;
  traits?: string;
  skills?: string;
  specializations?: string;
}

const CreateAgentPage = () => {
  const router = useRouter();
  const { address, isConnected, isConnecting } = useAccount()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [agentData, setAgentData] = useState({
    name: '',
    avatar: '',
    description: '',
    traits: [],
    skills: [],
    specializations: [],
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const steps = ['Identity', 'Traits & Skills', 'Specialization', 'Review'];
  
  const formComponents = [
    <IdentityForm key="identity" agentData={agentData} setAgentData={setAgentData}  />,
    <TraitsForm key="traits" agentData={agentData} setAgentData={setAgentData}  />,
    <SpecializationForm key="spec" agentData={agentData} setAgentData={setAgentData}  />,
    <ReviewForm key="review" agentData={agentData} />
  ];

  const validateForm = () => {
    const errors: FormErrors = {};
    
    if (!agentData.name) {
      errors.name = 'Name is required';
    }

    if (!agentData.description) {
      errors.description = 'Description is required';
    }
    
    // if (Object.keys(agentData.traits).length === 0) {
    //   errors.traits = 'At least one trait must be selected';
    // }
    
    // if (agentData.skills.length === 0) {
    //   errors.skills = 'At least one skill must be selected';
    // }
    
    // if (agentData.specializations.length === 0) {
    //   errors.specializations = 'At least one specialization must be selected';
    // }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error('Please fix the highlighted errors');
      return false;
    }

    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    setIsSubmitting(true);
  
    const newAgent = {
      wallet_address: address,
      name: agentData.name,
      avatar: agentData.avatar,
      description: agentData.description,
      traits: agentData.traits || [],
      skills: agentData.skills || [],
      specializations: agentData.specializations || [],
      experience: 0,
      level: 1,
    };
  
    try {
      // TODO: create cannister with agent data
      // TODO2: Mint NFT with cannister metadata

      // newAgent
      const data = {agent: {} as any} 
  
      // toast.success('Agent created successfully!');
      // router.push(`/agents/${data.agent._id}`);
    } catch (error: any) {
      console.error('Error creating agent:', error);
      const errorMsg = error.response?.data?.message || 'Failed to create agent. Please try again.';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black">
      <Head>
        <title>Create Agent - AI Agent Arena</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <h2 className="text-xl text-white">Please connect your wallet to create an agent</h2>
            <WalletButton />
          </div>
        ) : (
          <>
            <ProgressStepper steps={steps} currentStep={currentStep} />

            <div className="mt-8 grid grid-cols-3 gap-8">
              <div className="col-span-2">
                {formComponents[currentStep]}

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    className="px-6 py-2 border-2 border-white/20 rounded-lg text-white"
                    disabled={currentStep === 0 || isSubmitting}
                  >
                    Back
                  </button>

                  {currentStep === steps.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white disabled:opacity-50 flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                          <span>Creating...</span>
                        </>
                      ) : (
                        'Create Agent'
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <AgentPreview agentData={agentData as any} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CreateAgentPage), {
  ssr: false
});
