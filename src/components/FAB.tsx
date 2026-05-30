'use client';
import { useState } from 'react';
import { Plus, CheckCircle2, Bookmark, ArrowRight, Search, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const actions = [
  { label: 'Tandai Sudah Upload', icon: CheckCircle2, href: '/today' },
  { label: 'Tambah Watchlist', icon: Bookmark, href: '/search' },
  { label: 'Anime Berikutnya', icon: ArrowRight, href: '/schedule' },
  { label: 'Quick Search', icon: Search, href: '/search' },
  { label: 'Quick Status Update', icon: RefreshCw, href: '/watchlist' },
];

export function FAB() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed right-4 bottom-20 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 space-y-2 flex flex-col items-end"
          >
            {actions.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                onClick={() => setOpen(false)}
                className="glass rounded-full pl-3 pr-4 py-2 flex items-center gap-2 text-sm shadow-glow"
              >
                <a.icon size={16} className="text-neon-cyan" />
                {a.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-gradient-neon shadow-neon flex items-center justify-center active:scale-95 transition"
        aria-label="Quick action"
      >
        {open ? <X /> : <Plus />}
      </button>
    </div>
  );
}
