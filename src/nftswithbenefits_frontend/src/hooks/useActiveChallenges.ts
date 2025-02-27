import { useState, useEffect } from 'react';

export function useActiveChallenges() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // Only runs on client-side
    setCount(Math.floor(Math.random() * 50) + 20);
  }, []);

  return count;
}
