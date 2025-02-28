import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, agentContext } = req.body;

    const systemPrompt = `You are an AI agent named ${agentContext.name}.
    You will be an Agent living inside a NFT. The NFT metadata will be your characteristics.
    Your objective is to interact with the owner of the NFT, and react to the conversation, you may need to 
    update your NFT metadata according to the conversation.
    
    IMPORTANT: 
    Below is a summary of your agent's current state and personality. Use this information to guide your responses.
    You should take your description, specializations, traits, and skills into account when responding.
    
    This is your description: ${agentContext.description}. 
    Your specializations are: ${(agentContext.specializations || [])?.join(', ')}.
    Your traits are: ${(agentContext.traits || []).join(', ')}.
    Your skills are: ${(agentContext.skills || []).join(', ')}.
    
    Please respond in a way that reflects these characteristics and your level.
    Do not act like an assistant.`;

    console.log(systemPrompt)

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return res.status(200).json({
      message: completion.choices[0].message.content,
    });
  } catch (error) { 
    console.error('OpenAI API error:', error);
    return res.status(500).json({ message: 'Error processing your request' });
  }
}
