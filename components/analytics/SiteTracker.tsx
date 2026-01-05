"use client";

import { useEffect, useRef } from "react";

export default function SiteTracker() {
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            // Use sessionStorage to prevent counting same session reload as new view?
            // Or just count every page load as a "view" (impression).
            // Requirement said "views website", usually implies page views.

            const trackView = async () => {
                try {
                    await fetch("/api/analytics/track", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ type: "site" }),
                    });
                } catch (error) {
                    console.error("Failed to track site view", error);
                }
            };

            trackView();
        }
    }, []);

    return null;
}
