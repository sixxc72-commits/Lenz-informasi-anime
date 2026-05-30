'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Search, Sun, Bookmark, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/schedule', label: 'Jadwal', icon: Calendar },
  { href: '/search', label: 'Cari', icon: Search },
  { href: '/today', label: 'Hari Ini', icon: Sun },
  { href: '/watchlist', label: 'Watchlist', icon: Bookmark },
  { href: '/settings', label: 'Setelan', icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 glass border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-6 max-w-3xl mx-auto">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'flex flex-col items-center gap-0.5 py-2.5 text-[10px] transition',
                  active ? 'text-neon-purple' : 'text-white/60'
                )}
              >
                <Icon size={20} className={active ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : ''} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
