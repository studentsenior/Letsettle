'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SortSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'trending';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    params.set('page', '1'); // Reset to first page on sort change
    router.push(`/all-debates?${params.toString()}`);
  };

  return (
    <select
      value={currentSort}
      onChange={(e) => handleSortChange(e.target.value)}
      className="px-3 py-2 text-sm font-medium transition-all cursor-pointer"
      style={{
        border: '1px solid var(--color-base-border)',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: 'var(--color-base-surface)',
        color: 'var(--color-text-primary)'
      }}
    >
      <option value="trending">🔥 Trending</option>
      <option value="newest">🆕 Newest</option>
      <option value="most-voted">👑 Most Voted</option>
    </select>
  );
}
