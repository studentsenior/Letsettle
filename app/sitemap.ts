import { MetadataRoute } from "next";
import dbConnect from "@/lib/db";
import Debate from "@/models/Debate";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL || "https://letsettle.rafey.space";

    // Static routes
    const routes = [
        "",
        "/about",
        "/privacy-policy",
        "/terms-of-service",
        "/how-it-works",
        "/all-debates",
        "/categories",
        "/search",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Dynamic routes (Debates)
    await dbConnect();
    const debates = await Debate.find(
        { status: "approved" },
        { slug: 1, updatedAt: 1 }
    ).lean();

    const debateRoutes = debates.map((debate) => ({
        url: `${baseUrl}/debate/${debate.slug}`,
        lastModified: new Date(debate.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [...routes, ...debateRoutes];
}
