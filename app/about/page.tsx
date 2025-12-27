import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
    title: "About Us | Letsettle",
    description:
        "Learn about Letsettle, the platform dedicated to transparent public voting and settling debates with clear, unbiased data.",
};

export default function AboutPage() {
    return <AboutClient />;
}
