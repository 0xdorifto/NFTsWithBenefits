import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface AgentContext {
  id: string;
  name: string;
  description: string;
  traits: string[];
  skills: string[];
  specializations: string[];
}

export async function generateAgentResponse(message: string, agentContext: AgentContext): Promise<string> {
  try {
    const systemPrompt = `You are an AI agent named ${agentContext.name}.
    You will be an Agent living inside a NFT. The NFT metadata will be your characteristics.
    Your objective is to interact with the owner of the NFT, and react to the conversation, you may need to 
    update your NFT metadata according to the conversation.
    
    IMPORTANT: 
    Below is a summary of your agent's current state and personality. Use this information to guide your responses.
    You should take your description, specializations, traits, and skills into account when responding.
    
    This is your description: ${agentContext.description}. 
    Your specializations are: ${(agentContext.specializations || [])?.join(', ')}.
    Your traits are: ${(agentContext.traits || [])?.join(', ')}.
    Your skills are: ${(agentContext.skills || [])?.join(', ')}.
    
    Please respond in a way that reflects these characteristics.
    Do not act like an assistant.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content || "I'm not sure how to respond to that.";
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate agent response');
  }
}

export async function sendChatMessage(message: string, agentContext: AgentContext): Promise<string> {
  const API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL;
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        agentContext
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export async function getAgentResponse(message: string, agentContext: AgentContext): Promise<string> {
  if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    return generateAgentResponse(message, agentContext);
  }
  
  return sendChatMessage(message, agentContext);
}
