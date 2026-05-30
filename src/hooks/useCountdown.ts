'use client';
import { useEffect, useState } from 'react';
import { diff } from '@/lib/timezone';

export function useCountdown(target?: Date | string | null) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, []);
  if (!target) return null;
  const t = typeof target === 'string' ? new Date(target) : target;
  return diff(t);
}
