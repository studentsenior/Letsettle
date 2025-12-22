'use client';

import { useEffect, useState } from 'react';

// Simple random generator to avoid adding heavy dependency for MVP fingerprint
function generateFingerprint() {
    return 'fp_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

export function useFingerprint() {
  const [fingerprint, setFingerprint] = useState<string>('');

  useEffect(() => {
    let stored = localStorage.getItem('ls_fingerprint');
    if (!stored) {
      stored = generateFingerprint();
      localStorage.setItem('ls_fingerprint', stored);
    }
    setFingerprint(stored);
  }, []);

  return fingerprint;
}
