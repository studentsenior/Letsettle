import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVote extends Document {
  debateId: mongoose.Types.ObjectId;
  optionId: mongoose.Types.ObjectId;
  ip: string;
  fingerprintId: string;
  createdAt: Date;
}

const VoteSchema: Schema = new Schema(
  {
    debateId: { type: Schema.Types.ObjectId, ref: 'Debate', required: true },
    optionId: { type: Schema.Types.ObjectId, ref: 'Option', required: true },
    ip: { type: String, required: true },
    fingerprintId: { type: String, required: true },
  },
  { timestamps: true }
);

// Unique constraints to prevent duplicate voting
VoteSchema.index({ debateId: 1, ip: 1 }, { unique: true });
VoteSchema.index({ debateId: 1, fingerprintId: 1 }, { unique: true });

const Vote: Model<IVote> =
  mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema);

export default Vote;
