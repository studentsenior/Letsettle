import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Option from "@/models/Option";

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const body = await request.json();
        const { debateId, name } = body;

        if (!debateId || !name) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check for duplicate option (case-insensitive)
        const existingOption = await Option.findOne({
            debateId,
            name: { $regex: new RegExp(`^${name.trim()}$`, "i") },
        });

        if (existingOption) {
            return NextResponse.json(
                { error: "This option already exists" },
                { status: 409 }
            );
        }

        const newOption = await Option.create({
            debateId,
            name: name.trim(),
        });

        return NextResponse.json(
            {
                ...newOption.toObject(),
                _id: newOption._id.toString(),
                createdAt: newOption.createdAt.toISOString(),
                updatedAt: newOption.updatedAt.toISOString(),
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding option:", error);
        return NextResponse.json(
            { error: "Failed to add option" },
            { status: 500 }
        );
    }
}
