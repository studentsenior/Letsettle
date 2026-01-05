import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Analytics from "@/models/Analytics";
import Debate from "@/models/Debate";

export async function POST(req: NextRequest) {
    try {
        const { type, id } = await req.json();

        if (!type || !["site", "debate"].includes(type)) {
            return NextResponse.json(
                { error: "Invalid type" },
                { status: 400 }
            );
        }

        if (type === "debate" && !id) {
            return NextResponse.json(
                { error: "Debate ID is required" },
                { status: 400 }
            );
        }

        await dbConnect();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const analyticsData: any = {
            type: `${type}_views`, // site_views or debate_views
            date: today,
        };

        if (type === "debate") {
            analyticsData.entityId = id;
        }

        // 1. Upsert Analytics document (Granular tracking)
        await Analytics.findOneAndUpdate(
            {
                type: analyticsData.type,
                entityId: analyticsData.entityId,
                date: analyticsData.date,
            },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
        );

        // 2. If debate view, also increment global counter on Debate model (Efficient total)
        if (type === "debate") {
            await Debate.findByIdAndUpdate(id, { $inc: { views: 1 } });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Tracking error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
