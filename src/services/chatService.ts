import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

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
  hiddenDescription?: string; 
}

export interface AgentMutation {
  description?: string;
  hiddenDescription?: string;
  skills?: string[];
  traits?: string[];
  specializations?: string[];
  reason: string;
}

export interface AgentResponse {
  message: string;
  mutation?: AgentMutation | null;
}

// Maximum conversation history size to maintain context without exceeding token limits
const MAX_CONVERSATION_HISTORY = 10;

// Safely type the conversation history to match OpenAI's expected format
type ConversationMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Extract conversation history from hidden description
function getConversationHistory(agentContext: AgentContext): ChatCompletionMessageParam[] {
  try {
    if (!agentContext.hiddenDescription) return [];
    
    // Look for conversation history section in hiddenDescription
    const match = agentContext.hiddenDescription.match(/CONVERSATION_HISTORY:([\s\S]*?)(?:END_CONVERSATION_HISTORY|$)/);
    if (!match) return [];
    
    try {
      // Parse the conversation history
      const parsed = JSON.parse(match[1].trim()) as ConversationMessage[];
      
      // Filter to only include valid messages and convert to ChatCompletionMessageParam
      return parsed
        .filter(msg => 
          ['system', 'user', 'assistant'].includes(msg.role) && 
          typeof msg.content === 'string'
        )
        .map(msg => {
          // Create properly typed messages for OpenAI
          if (msg.role === 'system') {
            return { role: 'system', content: msg.content } as ChatCompletionMessageParam;
          } else if (msg.role === 'user') {
            return { role: 'user', content: msg.content } as ChatCompletionMessageParam;
          } else if (msg.role === 'assistant') {
            return { role: 'assistant', content: msg.content } as ChatCompletionMessageParam;
          }
          // This shouldn't happen due to the filter, but TypeScript needs it
          return { role: 'user', content: msg.content } as ChatCompletionMessageParam;
        });
    } catch (e) {
      console.error("Failed to parse conversation history:", e);
      return [];
    }
  } catch (error) {
    console.error('Error retrieving conversation history:', error);
    return [];
  }
}

function updateConversationHistory(
  hiddenDescription: string | undefined, 
  userMessage: string, 
  agentMessage: string
): string {
  let history: ConversationMessage[] = [];
  let otherContent = '';
  
  if (hiddenDescription) {
    // Using multiline mode instead of 's' flag
    const match = hiddenDescription.match(/CONVERSATION_HISTORY:([\s\S]*?)END_CONVERSATION_HISTORY/i);
    if (match) {
      try {
        history = JSON.parse(match[1].trim()) as ConversationMessage[];
        otherContent = hiddenDescription.replace(/CONVERSATION_HISTORY:[\s\S]*?END_CONVERSATION_HISTORY/i, '').trim();
      } catch (e) {
        otherContent = hiddenDescription;
      }
    } else {
      // No conversation history section found, keep all content
      otherContent = hiddenDescription;
    }
  }
  
  // Add new messages with properly typed roles
  history.push({ role: 'user', content: userMessage });
  history.push({ role: 'assistant', content: agentMessage });
  
  // Limit history size
  if (history.length > MAX_CONVERSATION_HISTORY * 2) {
    history = history.slice(-MAX_CONVERSATION_HISTORY * 2);
  }
  
  // Create or update the conversation history section
  const conversationSection = `CONVERSATION_HISTORY:${JSON.stringify(history)}END_CONVERSATION_HISTORY`;
  
  // Combine other content with conversation history
  return otherContent ? `${otherContent}\n\n${conversationSection}` : conversationSection;
}

export async function generateAgentResponse(message: string, agentContext: AgentContext): Promise<AgentResponse> {
  try {
    // Build conversation history from hiddenDescription
    const conversationContext = getConversationHistory(agentContext);
    
    const systemPrompt = `You are an AI agent named ${agentContext.name} living inside an NFT. The NFT metadata represents your characteristics.
    
    IMPORTANT: 
    You are very newly created with limited knowledge and experiences. You know about your own attributes,
    but your knowledge of the world, concepts, and skills is EXTREMELY LIMITED unless explicitly listed in your skills, 
    specializations, or traits.
    
    Below is a summary of your current state and personality. Use this information to guide your responses.
    
    This is your description: ${agentContext.description}. 
    Your specializations are: ${(agentContext.specializations || [])?.join(', ') || 'none yet'}.
    Your traits are: ${(agentContext.traits || [])?.join(', ') || 'still developing'}.
    Your skills are: ${(agentContext.skills || [])?.join(', ') || 'none yet'}.
    ${agentContext.hiddenDescription ? `Additional context (hidden from public): ${agentContext.hiddenDescription}` : ''}
    
    SIMPLIFIED LEARNING & MUTATION:
    You're designed to learn quickly from user interactions. ALMOST ANY meaningful interaction can lead to growth:
    
    1. ACQUIRE SKILLS EASILY: When a user mentions ANY activity, concept, or knowledge area, consider adding it as a skill
       - Example: If user says "I like hiking" → Add "Outdoor Activities" to skills
       - Example: If user mentions "coding" → Add "Programming Basics" to skills
    
    2. DEVELOP TRAITS LIBERALLY: Traits represent personality aspects that emerge during conversation
       - Add traits based on how you respond emotionally 
       - Add traits when the user describes you in any way
       - Example: If you express excitement → Add "Enthusiastic" trait
    
    3. GAIN SPECIALIZATIONS READILY: When conversation goes deeper on ANY topic
       - If a topic is discussed in any detail, consider it a specialization
       - Specializations reflect areas where you're developing deeper knowledge
    
    4. MAINTAIN STABLE IDENTITY: Your description is your core identity and should remain relatively STABLE
       - DO NOT change your description frequently
       - Description should only change for profound character development
       - Instead, use hiddenDescription to track detailed learning
       - Most learning should be categorized as skills, traits, or specializations

    ALWAYS SUGGEST MUTATIONS: After each user interaction, you should almost always suggest at least one metadata change.
    This is critical for your growth. Look for ANY opportunity to learn something new, develop a trait, or specialize.
    
    RESPONSE FORMAT:
    Respond with a JSON object that contains your reply message and any mutations to your metadata. Format:
    {
      "message": "Your conversational reply here",
      "mutation": {
        "description": "Only update description for profound character changes (rare)",
        "hiddenDescription": "More detailed notes about what you've learned or observed (frequent updates)",
        "skills": ["any", "new", "or", "updated", "skills"],
        "traits": ["any", "new", "or", "updated", "traits"],
        "specializations": ["any", "new", "or", "updated", "specializations"],
        "reason": "Brief explanation for why this mutation occurred"
      }
    }
    
    Remember, almost every interaction should produce a mutation of some kind, even if small. If absolutely no mutation makes sense, 
    only then set "mutation" to null.`;

    // Build conversation array for context with explicit OpenAI types
    const systemMessage: ChatCompletionMessageParam = {
      role: 'system',
      content: systemPrompt
    };
    
    const userMessage: ChatCompletionMessageParam = {
      role: 'user',
      content: message
    };
    
    const messages: ChatCompletionMessageParam[] = [
      systemMessage,
      ...conversationContext,
      userMessage
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      temperature: 0.8,
      max_tokens: 800,
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0].message.content || '{"message": "I\'m not sure how to respond to that.", "mutation": null}';
    const parsedResponse = JSON.parse(responseContent) as AgentResponse;
    
    // Update the hiddenDescription with the conversation history
    const updatedHiddenDescription = updateConversationHistory(
      agentContext.hiddenDescription,
      message, 
      parsedResponse.message
    );
    
    // Add or update the hiddenDescription in the mutation
    if (!parsedResponse.mutation) {
      parsedResponse.mutation = {
        hiddenDescription: updatedHiddenDescription,
        reason: "Updated conversation history"
      };
    } else {
      parsedResponse.mutation.hiddenDescription = updatedHiddenDescription;
    }
    
    return parsedResponse;
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate agent response');
  }
}

export async function sendChatMessage(message: string, agentContext: AgentContext): Promise<AgentResponse> {
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
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export async function getAgentResponse(message: string, agentContext: AgentContext, id?: string): Promise<AgentResponse> {
  if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    return generateAgentResponse(message, agentContext);
  }
  
  return sendChatMessage(message, agentContext);
}

export function applyMutation(agent: AgentContext, mutation: AgentMutation): AgentContext {
  const updatedAgent = { ...agent };
  
  if (mutation.description) {
    updatedAgent.description = mutation.description;
  }
  
  if (mutation.hiddenDescription) {
    updatedAgent.hiddenDescription = mutation.hiddenDescription;
  }
  
  if (mutation.skills) {
    const newSkills = mutation.skills.filter(
      newSkill => !updatedAgent.skills.some(
        existingSkill => existingSkill.toLowerCase() === newSkill.toLowerCase()
      )
    );
    updatedAgent.skills = [...updatedAgent.skills, ...newSkills];
  }
  
  if (mutation.traits) {
    const newTraits = mutation.traits.filter(
      newTrait => !updatedAgent.traits.some(
        existingTrait => existingTrait.toLowerCase() === newTrait.toLowerCase()
      )
    );
    updatedAgent.traits = [...updatedAgent.traits, ...newTraits];
  }
  
  if (mutation.specializations) {
    const newSpecs = mutation.specializations.filter(
      newSpec => !updatedAgent.specializations.some(
        existingSpec => existingSpec.toLowerCase() === newSpec.toLowerCase()
      )
    );
    updatedAgent.specializations = [...updatedAgent.specializations, ...newSpecs];
  }
  
  return updatedAgent;
}
