"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroDebateDemo from "./HeroDebateDemo";

export default function Hero() {
    return (
        <section
            className="pt-8 pb-16 px-6 text-center"
            style={{
                backgroundColor: "var(--color-base-bg)",
                borderBottom: "1px solid var(--color-base-border)",
            }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                {/* Left: Content */}
                <div className="text-left space-y-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-bold tracking-tight leading-none"
                        style={{
                            color: "var(--color-text-primary)",
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            marginBottom: "var(--space-md)",
                        }}
                    >
                        Settle The
                        <br />
                        <span style={{ color: "var(--color-accent)" }}>
                            Unsettled
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: "easeOut",
                        }}
                        className="max-w-xl"
                        style={{
                            color: "var(--color-text-secondary)",
                            fontSize: "var(--font-size-lg)",
                            lineHeight: "1.6",
                        }}
                    >
                        The public voting platform where opinions turn into
                        data. Vote on trending debates or start your own.
                    </motion.p>

                    {/* Search Bar - Ready for implementation */}
                    {/* <div className="max-w-md relative group">
                            <div
                                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                                style={{ color: "var(--color-text-tertiary)" }}
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search topic..."
                                className="w-full py-4 pl-12 pr-4 rounded-full outline-none transition-all shadow-sm focus:shadow-md"
                                style={{
                                    backgroundColor:
                                        "var(--color-base-surface)",
                                    border: "1px solid var(--color-base-border)",
                                    color: "var(--color-text-primary)",
                                    fontSize: "var(--font-size-base)",
                                }}
                            />
                        </div> */}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.4,
                            ease: "easeOut",
                        }}
                        className="pt-2 flex items-center gap-6"
                    >
                        <Link
                            href="/create"
                            className="font-medium transition-opacity hover:opacity-70 flex items-center gap-2"
                            style={{
                                color: "var(--color-accent)",
                                fontSize: "var(--font-size-base)",
                            }}
                        >
                            Start a Debate
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                        <Link
                            href="/all-debates"
                            className="font-medium transition-opacity hover:opacity-70 flex items-center gap-2"
                            style={{
                                fontSize: "var(--font-size-base)",
                            }}
                        >
                            Explore Debates
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </motion.div>
                </div>

                {/* Right: Live Demo Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1,
                        delay: 0.3,
                        ease: "easeOut",
                    }}
                    className="relative hidden lg:block"
                >
                    <HeroDebateDemo />
                </motion.div>
            </div>
        </section>
    );
}
