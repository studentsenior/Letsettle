import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOption extends Document {
    debateId: mongoose.Types.ObjectId;
    name: string;
    votes: number;
    createdAt: Date;
    updatedAt: Date;
}

const OptionSchema: Schema = new Schema(
    {
        debateId: {
            type: Schema.Types.ObjectId,
            ref: "Debate",
            required: true,
            index: true,
        },
        name: { type: String, required: true, maxlength: 100 },
        votes: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Option: Model<IOption> =
    mongoose.models.Option || mongoose.model<IOption>("Option", OptionSchema);

export default Option;
