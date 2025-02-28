import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaSyncAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { getAgentResponse, AgentContext } from '@/services/chatService';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

interface AgentChatInterfaceProps {
  agent: {
    id: string;
    name: string;
    avatar: string;
    description?: string;
    traits?: Record<string, number>;
    skills?: string[];
    specializations?: string[];
  };
}

const AgentChatInterface: React.FC<AgentChatInterfaceProps> = ({ agent }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      sender: 'agent',
      text: `Hello! I'm ${agent.name}, your AI assistant. How can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to bottom whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message to the chat
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
      // Prepare the agent context to send to the API
      const agentContext: AgentContext = {
        id: agent.id,
        name: agent.name,
        description: agent.description || '',
        traits: Object.entries(agent.traits || {}).map(([key, value]) => `${key}: ${value}/100`),
        skills: agent.skills || [],
        specializations: agent.specializations || [],
      };
      
      // Get response from our service (either direct OpenAI or API)
      const responseText = await getAgentResponse(inputMessage, agentContext);
      
      // Add the agent's response to the chat
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: responseText,
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
      {/* Chat header */}
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
      
      {/* Chat messages */}
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
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
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
      
      {/* Input form */}
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
