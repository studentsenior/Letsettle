import Link from 'next/link';
import VoteButton from './VoteButton';
import { Debate } from '@/lib/types';

export default function DebateCard({ debate }: { debate: Debate }) { 
  const d = debate;

  return (
    <div 
      className="p-6 transition-all hover-accent-border"
      style={{
        backgroundColor: 'var(--color-base-surface)',
        border: '1px solid var(--color-base-border)',
        borderRadius: 'var(--radius-sm)'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div 
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          <span>{d.category}</span>
          {d.subCategory && (
            <>
              <span>·</span>
              <span>{d.subCategory}</span>
            </>
          )}
        </div>
        <div 
          className="text-sm font-mono-numbers"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {d.totalVotes}
        </div>
      </div>

      <Link href={`/debate/${d.slug}`} className="block group mb-6">
        <h3 
          className="font-medium leading-tight group-hover:opacity-70 transition-opacity"
          style={{ 
            color: 'var(--color-text-primary)',
            fontSize: 'var(--font-size-xl)'
          }}
        >
          {d.title}
        </h3>
      </Link>

      <div className="space-y-3">
        {d.options.slice(0, 3).map((opt) => (
          <VoteButton
            key={opt._id.toString()}
            debateId={d._id.toString()}
            optionId={opt._id.toString()}
            optionName={opt.name}
            initialVotes={opt.votes}
            totalVotes={d.totalVotes}
          />
        ))}
      </div>
      
      {d.options.length > 3 && (
        <div className="mt-4 text-center">
          <Link 
            href={`/debate/${d.slug}`} 
            className="text-sm font-medium hover-subtle transition-opacity"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            + {d.options.length - 3} more
          </Link>
        </div>
      )}
    </div>
  );
}
