'use client';
import Link from 'next/link';
import { Search } from 'lucide-react';

export function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 glass border-b border-white/10">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg neon-text">
          ANIQUEUE
        </Link>
        <span className="text-sm text-white/70">{title}</span>
        <Link href="/search" className="p-2 -mr-2 text-white/70 active:text-white">
          <Search size={20} />
        </Link>
      </div>
    </header>
  );
}
