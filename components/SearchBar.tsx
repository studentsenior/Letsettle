'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/lib/hooks/useDebounce';

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      setIsSearching(true);
      // Navigate to search results
      router.push(`/search?q=${encodeURIComponent(debouncedQuery)}`);
      setIsSearching(false);
    }
  }, [debouncedQuery, router]);

  const handleClear = () => {
    setQuery('');
    router.push('/all-debates');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={18}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search debates..."
          className="w-full pl-10 pr-10 py-2 text-sm transition-all focus:outline-none"
          style={{
            border: '1px solid var(--color-base-border)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-base-surface)',
            color: 'var(--color-text-primary)'
          }}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            <X size={16} />
          </button>
        )}
      </div>
      {isSearching && (
        <div 
          className="absolute left-3 bottom-[-20px] text-xs"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Searching...
        </div>
      )}
    </div>
  );
}
