"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroDebateDemo() {
    // Demo state - simulates a user voting
    const [hasVoted, setHasVoted] = useState(false);
    const [votes, setVotes] = useState({ option1: 45, option2: 55 });

    const handleVote = (option: 1 | 2) => {
        if (hasVoted) return;
        setHasVoted(true);
        if (option === 1) {
            setVotes({ option1: 60, option2: 40 });
        } else {
            setVotes({ option1: 40, option2: 60 });
        }
    };

    return (
        <div className="relative w-full max-w-sm mx-auto">
            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-teal-100 rounded-full blur-2xl opacity-60"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-amber-100 rounded-full blur-2xl opacity-60"></div>

            {/* Card */}
            <div className="relative bg-white p-6 rounded-xl border border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold tracking-wider uppercase">
                        Demo
                    </span>
                    <span className="text-xs text-stone-400">12.5k votes</span>
                </div>

                <h3 className="text-xl font-bold text-stone-800 mb-6 leading-tight">
                    Which is the superior morning drink?
                </h3>

                <div className="space-y-3">
                    {/* Option 1 */}
                    <button
                        onClick={() => handleVote(1)}
                        className={`group relative w-full p-4 rounded-lg border text-left transition-all overflow-hidden ${
                            hasVoted
                                ? "border-transparent bg-stone-50"
                                : "border-stone-200 hover:border-teal-500 hover:shadow-sm bg-white"
                        }`}
                        disabled={hasVoted}
                    >
                        {/* Progress Bar Background */}
                        {hasVoted && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${votes.option1}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute inset-y-0 left-0 bg-teal-100/50"
                            />
                        )}

                        <div className="relative flex justify-between items-center z-10">
                            <span className="font-medium text-stone-700 group-hover:text-teal-700 transition-colors">
                                ☕ Coffee
                            </span>
                            {hasVoted && (
                                <motion.span
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="font-bold text-teal-700"
                                >
                                    {votes.option1}%
                                </motion.span>
                            )}
                        </div>
                    </button>

                    {/* Option 2 */}
                    <button
                        onClick={() => handleVote(2)}
                        className={`group relative w-full p-4 rounded-lg border text-left transition-all overflow-hidden ${
                            hasVoted
                                ? "border-transparent bg-stone-50"
                                : "border-stone-200 hover:border-amber-500 hover:shadow-sm bg-white"
                        }`}
                        disabled={hasVoted}
                    >
                        {/* Progress Bar Background */}
                        {hasVoted && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${votes.option2}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute inset-y-0 left-0 bg-amber-100/50"
                            />
                        )}

                        <div className="relative flex justify-between items-center z-10">
                            <span className="font-medium text-stone-700 group-hover:text-amber-600 transition-colors">
                                🍵 Tea
                            </span>
                            {hasVoted && (
                                <motion.span
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="font-bold text-amber-600"
                                >
                                    {votes.option2}%
                                </motion.span>
                            )}
                        </div>
                    </button>
                </div>

                {hasVoted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-center text-xs text-stone-400"
                    >
                        Vote recorded! Try creating your own debate.
                    </motion.div>
                )}
            </div>
        </div>
    );
}
