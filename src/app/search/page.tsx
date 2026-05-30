'use client';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { jikan } from '@/lib/api';
import { Header } from '@/components/Header';
import { AnimeCard } from '@/components/AnimeCard';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const [deb, setDeb] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setDeb(q.trim()), 400);
    return () => clearTimeout(t);
  }, [q]);

  const { data, isFetching } = useQuery({
    queryKey: ['search', deb],
    queryFn: () => jikan.search(deb, 24),
    enabled: deb.length > 1,
  });

  return (
    <>
      <Header title="Pencarian" />
      <div className="px-4 pt-4">
        <div className="glass rounded-2xl flex items-center gap-2 px-3 py-2">
          <SearchIcon size={18} className="text-white/50" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari judul, romaji, english, alias…"
            className="bg-transparent outline-none flex-1 text-sm py-1"
          />
        </div>
        {isFetching && <p className="text-center text-white/50 py-6 text-sm">Mencari…</p>}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {(data?.data ?? []).map((a: any) => (
            <AnimeCard
              key={a.mal_id}
              id={a.mal_id}
              title={a.title}
              image={a.images?.jpg?.image_url}
              score={a.score}
              type={a.type}
              episodes={a.episodes}
            />
          ))}
        </div>
        {deb.length > 1 && !isFetching && (data?.data?.length ?? 0) === 0 && (
          <p className="text-center text-white/50 py-10">Tidak ada hasil.</p>
        )}
      </div>
    </>
  );
}
