import AgentPreview from "@/components/agents/AgentPreview";
import IdentityForm from "@/components/agents/forms/IdentityForm";
import ReviewForm from "@/components/agents/forms/ReviewForm";
import SpecializationForm from "@/components/agents/forms/SpecializationForm";
import TraitsForm from "@/components/agents/forms/TraitsForm";
import ProgressStepper from "@/components/agents/ProgressStepper";
import {
  initSatellite,
  setDoc,
  uploadFile,
  type User,
} from "@junobuild/core-peer";
import { BrowserProvider, ethers } from "ethers";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import { NFT_CONTRACT_ABI } from "./abi";

// Client-side only wallet connection button
const WalletButton = dynamic(() => import("@/components/common/WalletButton"), {
  ssr: false,
});

interface FormErrors {
  name?: string;
  description?: string;
  traits?: string;
  skills?: string;
  specializations?: string;
}

const NFT_CONTRACT_ADDRESS = "0x7Ae0FC7Afc033517FdbE8Ef1d81C91031df0E4DA";

const CreateAgentPage = () => {
  const router = useRouter();
  const { address, isConnected, isConnecting } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [agentData, setAgentData] = useState({
    name: "",
    avatar: "",
    avatarMetadata: null,
    description: "",
    traits: [],
    skills: [],
    specializations: [],
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [junoUser, setJunoUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await initSatellite({
          satelliteId: process.env.NEXT_PUBLIC_SATELLITE_ID || "",
        });
      } catch (error) {
        console.error("Failed to initialize Juno satellite:", error);
        toast.error(
          "Failed to connect to the network. Please try again later."
        );
      }
    })();
  }, []);

  const steps = ["Identity", "Traits & Skills", "Specialization", "Review"];

  const formComponents = [
    <IdentityForm
      key="identity"
      agentData={agentData}
      setAgentData={setAgentData}
    />,
    <TraitsForm
      key="traits"
      agentData={agentData}
      setAgentData={setAgentData}
    />,
    <SpecializationForm
      key="spec"
      agentData={agentData}
      setAgentData={setAgentData}
    />,
    <ReviewForm key="review" agentData={agentData} />,
  ];

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!agentData.name) {
      errors.name = "Name is required";
    }

    if (!agentData.description) {
      errors.description = "Description is required";
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
      toast.error("Please fix the highlighted errors");
      return false;
    }

    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (!address) return;

    setIsSubmitting(true);

    try {
      // Create agent JSON data
      const agentJson = {
        wallet_address: address,
        name: agentData.name,
        avatar: agentData.avatar,
        avatar_metadata: agentData.avatarMetadata,
        description: agentData.description,
        traits: agentData.traits || [],
        skills: agentData.skills || [],
        specializations: agentData.specializations || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        version: "1.0.0",
      };

      const agentJsonBlob = new Blob([JSON.stringify(agentJson, null, 2)], {
        type: "application/json",
      });

      const agentId = `agent-${address}-${Date.now()}`;

      const agentFile = new File([agentJsonBlob], agentId, {
        type: "application/json",
      });

      // Upload metadata first
      const uploadResult = await uploadFile({
        collection: "agents",
        data: agentFile,
        filename: agentFile.name,
      });

      try {
        // Connect to the network
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Create contract instance
        const contract = new ethers.Contract(
          NFT_CONTRACT_ADDRESS,
          NFT_CONTRACT_ABI,
          signer
        );

        // Mint NFT
        console.log("Minting NFT...");
        const mintTx = await contract.mint();
        console.log("Waiting for mint transaction...");
        const receipt = await mintTx.wait();
        console.log("NFT minted successfully");

        // Get the token ID from the mint event
        const transferEvent = receipt.logs.find((log) => {
          try {
            const parsed = ethers.Interface.from(NFT_CONTRACT_ABI).parseLog({
              topics: [...log.topics],
              data: log.data,
            });
            return parsed?.name === "Transfer";
          } catch {
            return false;
          }
        });

        const tokenId = transferEvent
          ? parseInt(transferEvent.topics[3], 16)
          : 0;

        const network = await provider.getNetwork();

        // Save agent data with NFT contract info
        await setDoc({
          collection: "agents",
          doc: {
            key: agentId,
            data: {
              ...agentJson,
              fileUrl: uploadResult.downloadUrl,
              nftContractAddress: NFT_CONTRACT_ADDRESS,
              nftTokenId: tokenId,
              chainId: network.chainId,
            },
          },
        });

        toast.success("Agent created and NFT minted successfully!");
        router.push(`/agents/${agentId}`);
      } catch (error) {
        console.error("NFT minting error:", error);
        throw error;
      }
    } catch (error: any) {
      console.error("Error creating agent or minting NFT:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to create agent and mint NFT. Please try again.";
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
        <title>Create Agent</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <h2 className="text-xl text-white">
              Please connect your wallet to create an agent
            </h2>
            <WalletButton />
          </div>
        ) : (
          <>
            <ProgressStepper steps={steps} currentStep={currentStep} />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-2">
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
                        "Create Agent"
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

              <div className="col-span-1 order-first md:order-last">
                <AgentPreview agentData={agentData} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CreateAgentPage), {
  ssr: false,
});
