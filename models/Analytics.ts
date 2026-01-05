import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnalytics extends Document {
    type: "site_views" | "debate_views";
    entityId?: mongoose.Types.ObjectId;
    date: Date;
    count: number;
}

const AnalyticsSchema: Schema = new Schema(
    {
        type: {
            type: String,
            enum: ["site_views", "debate_views"],
            required: true,
            index: true,
        },
        entityId: { type: Schema.Types.ObjectId, ref: "Debate", index: true },
        date: { type: Date, required: true, index: true },
        count: { type: Number, default: 0 },
    },
    { timestamps: false }
);

// Compound index to ensure one document per entity per day
AnalyticsSchema.index({ type: 1, entityId: 1, date: 1 }, { unique: true });

// Prevent compiling model multiple times in development
const Analytics: Model<IAnalytics> =
    mongoose.models.Analytics ||
    mongoose.model<IAnalytics>("Analytics", AnalyticsSchema);

export default Analytics;
