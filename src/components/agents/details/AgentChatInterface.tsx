import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaSyncAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { getAgentResponse, AgentContext } from '@/services/chatService';
import { uploadFile, setDoc } from "@junobuild/core-peer";
import { queryClient } from '@/providers/web3Provider';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

interface AgentChatInterfaceProps {
  id: string;
  agent: {
    id: string;
    name: string;
    avatar: string;
    description?: string;
    traits?: Record<string, number>;
    skills?: string[];
    specializations?: string[];
    wallet_address?: string;
    created_at?: string;
    updated_at?: string;
    version?: string;
    avatar_metadata?: {
      styleId: string;
      variation: string;
    };
  };
}

const AgentChatInterface: React.FC<AgentChatInterfaceProps> = ({ id, agent }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  const updateAgent = async (agentUpdates: any) => {
    try {
      const updatedAgent = {
        ...agent,
        updated_at: new Date().toISOString(),
      };

      if (agentUpdates.description) {
        updatedAgent.description = agentUpdates.description;
      }

      if (agentUpdates.skills) {
        updatedAgent.skills = [
          ...(updatedAgent.skills || []),
          ...agentUpdates.skills.filter((skill: string) => 
            !updatedAgent.skills?.some((s: string) => s.toLowerCase() === skill.toLowerCase())
          )
        ];
      }

      if (agentUpdates.traits) {
        if (!updatedAgent.traits) {
          updatedAgent.traits = {};
        }
        

        agentUpdates.traits.forEach((trait: string) => {
          const traitName = trait.toLowerCase().trim();
          
          const existingTrait = Object.keys(updatedAgent.traits || {}).find(
            t => t.toLowerCase() === traitName
          );
          
          if (!existingTrait) {
            updatedAgent.traits[trait] = 50;
          }
        });
      }

      if (agentUpdates.specializations) {
        updatedAgent.specializations = [
          ...(updatedAgent.specializations || []),
          ...agentUpdates.specializations.filter((spec: string) => 
            !updatedAgent.specializations?.some((s: string) => s.toLowerCase() === spec.toLowerCase())
          )
        ];
      }

      const agentJsonBlob = new Blob([JSON.stringify(updatedAgent, null, 2)], {
        type: "application/json",
      });

      const agentFile = new File(
        [agentJsonBlob],
        `${id}.json`,
        { type: "application/json" }
      );

      const uploadResult = await uploadFile({
        collection: "agents",
        data: agentFile,
        filename: `${id}.json`
      });

      // await setDoc({
      //   collection: "agents",
      //   doc: {
      //     key: id,
      //     data: {
      //       ...updatedAgent,
      //       fileUrl: uploadResult.downloadUrl
      //     }
      //   },
      // });

      toast.success('Agent updated successfully!');
      queryClient.invalidateQueries({ queryKey: ["agent", id] })
      return true;
    } catch (error) {
      console.error('Error updating agent:', error);
      toast.error('Failed to update agent data');
      return false;
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const agentContext: AgentContext = {
        id: agent.id,
        name: agent.name,
        description: agent.description || '',
        // Convert traits object to array of strings for the prompt
        traits: Object.entries(agent.traits || {}).map(([key, value]) => `${key}: ${value}/100`),
        skills: agent.skills || [],
        specializations: agent.specializations || [],
      };

      const response = await getAgentResponse(inputMessage, agentContext, id);
      
      if (response.mutation) {
        await updateAgent(response.mutation);
        
        // const updateMessage: Message = {
        //   id: Date.now().toString() + '-update',
        //   sender: 'agent',
        //   text: `✨ I just learned something new: ${response.mutation.reason || 'Thank you for teaching me!'}`,
        //   timestamp: new Date(),
        // };
        
        // setMessages(prev => [...prev, updateMessage]);
      }

      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: response.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get response from agent');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 flex flex-col h-[600px]">
      <div className="bg-gray-800 p-4 flex items-center">
        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
          <img src={agent.avatar} alt={agent.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="text-white font-bold">{agent.name}</h2>
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-green-400 text-xs">Online</span>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                  }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === 'agent' ? (
                    <FaRobot className="text-gray-300" />
                  ) : (
                    <FaUser className="text-gray-300" />
                  )}
                  <span className="text-gray-300 text-xs">
                    {message.sender === 'user' ? 'You' : agent.name}
                  </span>
                </div>
                <p>{message.text}</p>
                <div className="text-right text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-lg p-3 flex items-center space-x-2">
                <FaSyncAlt className="animate-spin text-gray-400" />
                <span className="text-gray-400 text-sm">{agent.name} is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="bg-gray-800 p-4 flex space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading || !inputMessage.trim()}
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default AgentChatInterface;
