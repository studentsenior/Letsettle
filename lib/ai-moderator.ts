import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export type ModerationStatus = "approved" | "pending";

export async function moderateContent(
    title: string,
    description: string = "",
    options: string[] = []
): Promise<ModerationStatus> {
    if (!process.env.GEMINI_API_KEY) {
        console.warn("GEMINI_API_KEY not set, defaulting to pending status");
        return "pending";
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-flash-lite-latest",
        });

        const prompt = `
            You are a content moderator for a public debate platform.
            Analyze the following debate topic for toxicity, spam, hate speech, or inappropriate content.
            
            Title: "${title}"
            Description: "${description}"
            Options: ${JSON.stringify(options)}

            Classify the content into one of these categories:
            - SAFE: Suitable for general public audiences.
            - TOXIC: Contains hate speech, harassment, bullying, or violence.
            - SPAM: Nonsense, repetitive, advertising, or bot-generated content.
            - INAPPROPRIATE: NSFW, sexually explicit, or illegal content.

            Respond with ONLY the category name.
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text().trim().toUpperCase();

        // Map AI response to status
        if (text.includes("SAFE")) {
            return "approved";
        } else {
            // "TOXIC", "SPAM", "INAPPROPRIATE" or any uncertain response goes to pending
            return "pending";
        }
    } catch (error) {
        console.error("AI Moderation Error:", error);
        // Fail-safe: if AI fails, send to pending queue for manual review
        return "pending";
    }
}
