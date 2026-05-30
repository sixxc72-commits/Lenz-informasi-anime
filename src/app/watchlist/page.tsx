'use client';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { useAppStore, type Collection, type Priority } from '@/store/useAppStore';
import { StatusPicker } from '@/components/StatusPicker';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

const COLLECTIONS: { v: Collection; l: string }[] = [
  { v: 'watchlist', l: 'Watchlist' },
  { v: 'favorites', l: 'Favorit' },
  { v: 'planning', l: 'Planning' },
  { v: 'completed', l: 'Selesai' },
  { v: 'dropped', l: 'Dropped' },
];
const PRIO: { v: Priority; l: string; c: string }[] = [
  { v: 'tinggi', l: 'Tinggi', c: 'bg-red-500/30' },
  { v: 'sedang', l: 'Sedang', c: 'bg-yellow-500/30' },
  { v: 'rendah', l: 'Rendah', c: 'bg-emerald-500/30' },
];

export default function WatchlistPage() {
  const [tab, setTab] = useState<Collection>('watchlist');
  const tracked = useAppStore((s) => s.tracked);
  const setPriority = useAppStore((s) => s.setPriority);
  const remove = useAppStore((s) => s.remove);
  const setCollection = useAppStore((s) => s.setCollection);

  const list = Object.values(tracked)
    .filter((t) => t.collection === tab)
    .sort((a, b) => {
      const rank = { tinggi: 0, sedang: 1, rendah: 2 } as const;
      return rank[a.priority] - rank[b.priority];
    });

  return (
    <>
      <Header title="Watchlist" />
      <div className="px-4 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4">
          {COLLECTIONS.map((c) => (
            <button
              key={c.v}
              onClick={() => setTab(c.v)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition ${
                tab === c.v ? 'bg-gradient-neon border-transparent shadow-neon' : 'border-white/10 text-white/70'
              }`}
            >
              {c.l}
            </button>
          ))}
        </div>

        {list.length === 0 && (
          <p className="text-center text-white/50 py-12 text-sm">
            Belum ada anime di koleksi ini. Tambahkan dari halaman pencarian.
          </p>
        )}

        <ul className="space-y-2">
          {list.map((t) => (
            <li key={t.id} className="card p-3 flex gap-3">
              <Link href={`/anime/${t.id}`} className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.image} alt={t.title} className="w-14 h-20 object-cover rounded-lg" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/anime/${t.id}`}>
                  <h3 className="text-sm font-semibold line-clamp-2">{t.title}</h3>
                </Link>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {PRIO.map((p) => (
                    <button
                      key={p.v}
                      onClick={() => setPriority(t.id, p.v)}
                      className={`text-[10px] px-2 py-0.5 rounded-full border border-white/10 ${
                        t.priority === p.v ? p.c : 'text-white/60'
                      }`}
                    >
                      {p.l}
                    </button>
                  ))}
                </div>
                <div className="mt-2">
                  <StatusPicker id={t.id} title={t.title} image={t.image} />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <select
                    value={t.collection}
                    onChange={(e) => setCollection(t.id, e.target.value as Collection)}
                    className="bg-transparent border border-white/10 rounded-md text-[10px] px-1.5 py-0.5"
                  >
                    {COLLECTIONS.map((c) => (
                      <option key={c.v} value={c.v} className="bg-bg-soft">
                        {c.l}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => remove(t.id)} className="text-white/40 active:text-red-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
