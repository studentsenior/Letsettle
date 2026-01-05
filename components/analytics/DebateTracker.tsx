"use client";

import { useEffect, useRef } from "react";

interface DebateTrackerProps {
    debateId: string;
}

export default function DebateTracker({ debateId }: DebateTrackerProps) {
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current && debateId) {
            initialized.current = true;

            const trackView = async () => {
                try {
                    await fetch("/api/analytics/track", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ type: "debate", id: debateId }),
                    });
                } catch (error) {
                    console.error("Failed to track debate view", error);
                }
            };

            trackView();
        }
    }, [debateId]);

    return null;
}
