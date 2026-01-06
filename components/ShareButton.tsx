"use client";

import { useState } from "react";
import {
    Share2,
    Check,
    Twitter,
    Facebook,
    Linkedin,
    MessageCircle,
    Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonProps {
    title: string;
    slug: string;
    description?: string;
    totalVotes?: number;
    category?: string;
}

export default function ShareButton({
    title,
    slug,
    description = "",
    totalVotes = 0,
    category = "",
}: ShareButtonProps) {
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    const shareUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/debate/${slug}`
            : "";

    // Create engaging share text with context
    const createShareText = (
        platform: "twitter" | "facebook" | "linkedin" | "whatsapp"
    ) => {
        let text = title;

        // Add description snippet for platforms that support longer text
        if (
            description &&
            (platform === "linkedin" || platform === "whatsapp")
        ) {
            const shortDesc =
                description.length > 100
                    ? description.substring(0, 100) + "..."
                    : description;
            text += `\n\n${shortDesc}`;
        }

        // Add engagement context
        if (totalVotes > 0) {
            text += `\n\n🗳️ ${totalVotes.toLocaleString()} votes and counting!`;
        }

        // Add category for context
        if (category && platform !== "twitter") {
            text += `\n📁 ${category}`;
        }

        // Add call-to-action
        const cta =
            platform === "twitter"
                ? "\n\nVote now on Letsettle! 👇"
                : "\n\nCast your vote and see live results! 👇";
        text += cta;

        return text;
    };

    const encodedUrl = encodeURIComponent(shareUrl);

    // Create platform-specific share texts
    const twitterText = encodeURIComponent(createShareText("twitter"));
    const whatsappText = encodeURIComponent(createShareText("whatsapp"));

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Failed to copy link");
        }
    };

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${twitterText}&url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, // Facebook uses OG tags
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, // LinkedIn uses OG tags
        whatsapp: `https://wa.me/?text=${whatsappText}%20${encodedUrl}`,
    };

    const socialButtons = [
        {
            name: "Twitter",
            icon: Twitter,
            color: "#1DA1F2",
            link: shareLinks.twitter,
        },
        {
            name: "Facebook",
            icon: Facebook,
            color: "#4267B2",
            link: shareLinks.facebook,
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            color: "#0077B5",
            link: shareLinks.linkedin,
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            color: "#25D366",
            link: shareLinks.whatsapp,
        },
    ];

    return (
        <div className="relative">
            <motion.button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all relative overflow-hidden"
                style={{
                    color: "var(--color-accent)",
                    border: "1px solid var(--color-accent)",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--color-base-surface)",
                }}
                whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    animate={{ rotate: showShareMenu ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Share2 size={16} />
                </motion.div>
                <span className="hidden sm:block">Share</span>

                {/* Ripple effect on click */}
                <AnimatePresence>
                    {showShareMenu && (
                        <motion.div
                            className="absolute inset-0 rounded-[var(--radius-sm)]"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
                            }}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                        />
                    )}
                </AnimatePresence>
            </motion.button>

            <AnimatePresence>
                {showShareMenu && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowShareMenu(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />

                        {/* Share Menu */}
                        <motion.div
                            className="absolute right-0 mt-2 w-64 p-4 shadow-lg z-50"
                            style={{
                                backgroundColor: "var(--color-base-surface)",
                                border: "1px solid var(--color-base-border)",
                                borderRadius: "var(--radius-sm)",
                            }}
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            {/* Copy Link Button */}
                            <motion.button
                                onClick={handleCopyLink}
                                className="w-full flex items-center gap-3 p-3 mb-3 transition-all relative overflow-hidden"
                                style={{
                                    border: "1px solid var(--color-base-border)",
                                    borderRadius: "var(--radius-sm)",
                                    backgroundColor:
                                        "var(--color-accent-light)",
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow:
                                        "0 4px 12px rgba(139, 92, 246, 0.2)",
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    animate={
                                        copied
                                            ? {
                                                  scale: [1, 1.2, 1],
                                                  rotate: [0, 10, -10, 0],
                                              }
                                            : {}
                                    }
                                    transition={{ duration: 0.5 }}
                                >
                                    {copied ? (
                                        <Check
                                            size={20}
                                            style={{
                                                color: "var(--color-accent)",
                                            }}
                                        />
                                    ) : (
                                        <LinkIcon
                                            size={20}
                                            style={{
                                                color: "var(--color-accent)",
                                            }}
                                        />
                                    )}
                                </motion.div>
                                <span
                                    className="text-sm font-medium"
                                    style={{
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    {copied ? "Copied!" : "Copy Link"}
                                </span>

                                {/* Success animation */}
                                <AnimatePresence>
                                    {copied && (
                                        <motion.div
                                            className="absolute inset-0 rounded-[var(--radius-sm)]"
                                            style={{
                                                background:
                                                    "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
                                            }}
                                            initial={{ scale: 0, opacity: 1 }}
                                            animate={{ scale: 2, opacity: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            {/* Social Media Buttons */}
                            <div className="space-y-2">
                                <motion.p
                                    className="text-xs font-medium mb-2"
                                    style={{
                                        color: "var(--color-text-tertiary)",
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    Share on social media
                                </motion.p>

                                {socialButtons.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={social.name}
                                            href={social.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-2 transition-all"
                                            style={{
                                                border: "1px solid var(--color-base-border)",
                                                borderRadius:
                                                    "var(--radius-sm)",
                                            }}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.1 + index * 0.05,
                                                duration: 0.3,
                                                ease: "easeOut",
                                            }}
                                            whileHover={{
                                                scale: 1.03,
                                                x: 5,
                                                backgroundColor:
                                                    "var(--color-accent-light)",
                                                boxShadow:
                                                    "0 4px 12px rgba(0, 0, 0, 0.1)",
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <motion.div
                                                whileHover={{
                                                    rotate: [0, -10, 10, 0],
                                                    scale: 1.1,
                                                }}
                                                transition={{ duration: 0.4 }}
                                            >
                                                <Icon
                                                    size={18}
                                                    style={{
                                                        color: social.color,
                                                    }}
                                                />
                                            </motion.div>
                                            <span
                                                className="text-sm"
                                                style={{
                                                    color: "var(--color-text-primary)",
                                                }}
                                            >
                                                {social.name}
                                            </span>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
