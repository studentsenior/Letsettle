'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFingerprint } from '@/lib/hooks/useFingerprint';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from "sonner";

interface VoteButtonProps {
  debateId: string;
  optionId: string;
  optionName: string;
  initialVotes: number;
  totalVotes: number;
}

export default function VoteButton({
  debateId,
  optionId,
  optionName,
  initialVotes,
  totalVotes,
}: VoteButtonProps) {
  const router = useRouter();
  const fingerprintId = useFingerprint();
  
  const [votes, setVotes] = useState(initialVotes);
  const [isLoading, setIsLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [isThisOptionVoted, setIsThisOptionVoted] = useState(false);

  // Check localStorage on mount to see if user has voted for this debate
  useEffect(() => {
    const votedOptionId = localStorage.getItem(`vote_${debateId}`);
    if (votedOptionId) {
      setHasVoted(true);
      if (votedOptionId === optionId) {
        setIsThisOptionVoted(true);
      }
    }
  }, [debateId, optionId]);

  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoading || hasVoted || !fingerprintId) return;

    setIsLoading(true);

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ debateId, optionId, fingerprintId }),
      });

      if (res.ok) {
        setVotes((prev) => prev + 1);
        setHasVoted(true);
        setIsThisOptionVoted(true);
        // Store voted option in localStorage
        localStorage.setItem(`vote_${debateId}`, optionId);
        toast.success("Vote recorded");
        router.refresh();
      } else {
        const data = await res.json();
        if (res.status === 403) {
            toast.error(data.error);
            setHasVoted(true);
            // If backend says already voted, sync localStorage
            localStorage.setItem(`vote_${debateId}`, optionId);
        }
      }
    } catch (error) {
      console.error('Vote failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={isLoading || hasVoted}
      className={cn(
        "group relative flex items-center justify-between w-full p-4 transition-all",
        hasVoted 
          ? "cursor-default" 
          : "hover:opacity-70"
      )}
      style={{
        border: `1px solid ${isThisOptionVoted ? 'var(--color-accent)' : 'var(--color-base-border)'}`,
        borderRadius: 'var(--radius-sm)',
        backgroundColor: 'var(--color-base-surface)',
        transition: 'all var(--transition-slow)'
      }}
    >
      {/* Minimal Progress Bar - Always Visible */}
      <div 
        className="absolute left-0 top-0 bottom-0 transition-all"
        style={{ 
          width: `${percentage}%`,
          backgroundColor: 'var(--color-accent)',
          opacity: 0.08,
          borderRadius: 'var(--radius-sm)',
          transitionDuration: 'var(--transition-slow)'
        }} 
      />

      <div className="flex items-center gap-3 relative z-10">
        {/* Checkbox-style Indicator */}
        <div 
          className="flex items-center justify-center transition-all"
          style={{
            width: '20px',
            height: '20px',
            border: `2px solid ${isThisOptionVoted ? 'var(--color-accent)' : 'var(--color-base-border)'}`,
            borderRadius: '2px',
            backgroundColor: isThisOptionVoted ? 'var(--color-accent)' : 'transparent',
            transition: 'all var(--transition-slow)'
          }}
        >
          {isLoading ? (
            <Loader2 className="animate-spin w-3 h-3" style={{ color: 'var(--color-text-secondary)' }} />
          ) : isThisOptionVoted ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : null}
        </div>
        
        <span 
          className="font-medium text-left"
          style={{ 
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-base)'
          }}
        >
          {optionName}
        </span>
      </div>

      <div className="flex flex-col items-end relative z-10 gap-0.5">
        <span 
          className="font-mono-numbers font-medium"
          style={{ 
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-base)'
          }}
        >
          {votes}
        </span>
        {/* Always show percentage */}
        <span 
          className="font-mono-numbers text-xs font-medium"
          style={{ color: isThisOptionVoted ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }}
        >
          {percentage}%
        </span>
      </div>
    </button>
  );
}
