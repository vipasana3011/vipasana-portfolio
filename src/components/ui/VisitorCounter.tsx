'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    // Only increment once per session in browser
    const sessionKey = 'vipasana_visited_session';
    const isNewSession = !sessionStorage.getItem(sessionKey);

    const fetchVisitorCount = async () => {
      try {
        const res = await fetch(`/api/visitor?inc=${isNewSession ? '1' : '0'}`);
        if (res.ok) {
          const data = await res.json();
          setCount(data.count);
          if (isNewSession) {
            sessionStorage.setItem(sessionKey, '1');
            setHasIncremented(true);
          }
        } else {
          // Fallback static count
          setCount(284);
        }
      } catch {
        setCount(284);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-rose-300/40 dark:border-rose-800/40 bg-white/60 dark:bg-noir-850/60 shadow-sm text-xs text-neutral-700 dark:text-rose-200">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
      </span>

      <Eye className="w-3.5 h-3.5 text-rose-500" />
      <span className="font-medium">Live Visits:</span>
      <motion.span
        key={count}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono font-bold text-rose-600 dark:text-rose-400"
      >
        {count !== null ? count.toLocaleString() : '...'}
      </motion.span>
    </div>
  );
}
