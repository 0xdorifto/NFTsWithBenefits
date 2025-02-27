import mongoose from 'mongoose';

const AgentSchema = new mongoose.Schema({
  wallet_address: {
    type: String,
    required: [true, 'Wallet address is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  avatar: {
    type: String,
  },
  description: {
    type: String,
  },
  traits: {
    type: [String], 
    default: [],
  },
  skills: {
    type: [String],
    default: [],
  },
  specializations: {
    type: [String],
    default: [],
  },
  experience: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

export default mongoose.models.Agent || mongoose.model('Agent', AgentSchema);
