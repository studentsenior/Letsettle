import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDebate extends Document {
  slug: string;
  title: string;
  description?: string;
  category: string;
  subCategory?: string;
  totalVotes: number;
  isActive: boolean;
  isMoreOptionAllowed: boolean;
  createdAt: Date;
}

const DebateSchema: Schema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, maxlength: 150 },
    description: { type: String, maxlength: 500 },
    category: { type: String, required: true, index: true },
    subCategory: { type: String, index: true },
    totalVotes: { type: Number, default: 0, index: true },
    isActive: { type: Boolean, default: true },
    isMoreOptionAllowed: { type: Boolean, default: true }, // Added this field
  },
  { timestamps: true }
);

// Prevent compiling model multiple times in development
const Debate: Model<IDebate> =
  mongoose.models.Debate || mongoose.model<IDebate>('Debate', DebateSchema);

export default Debate;
