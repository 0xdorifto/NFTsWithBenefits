export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  error: string | null;
}
