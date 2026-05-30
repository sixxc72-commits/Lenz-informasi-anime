'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { jikan } from '@/lib/api';
import { Header } from '@/components/Header';
import { AnimeCard } from '@/components/AnimeCard';
import { StatusPicker } from '@/components/StatusPicker';

const DAYS = [
  { id: 'monday', label: 'Senin' },
  { id: 'tuesday', label: 'Selasa' },
  { id: 'wednesday', label: 'Rabu' },
  { id: 'thursday', label: 'Kamis' },
  { id: 'friday', label: 'Jumat' },
  { id: 'saturday', label: 'Sabtu' },
  { id: 'sunday', label: 'Minggu' },
];

export default function SchedulePage() {
  const todayIdx = (new Date().getDay() + 6) % 7; // Senin=0
  const [day, setDay] = useState(DAYS[todayIdx].id);

  const { data, isLoading } = useQuery({
    queryKey: ['schedule', day],
    queryFn: () => jikan.schedule(day),
  });

  return (
    <>
      <Header title="Jadwal" />
      <div className="px-4 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 no-scrollbar">
          {DAYS.map((d) => (
            <button
              key={d.id}
              onClick={() => setDay(d.id)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border transition ${
                day === d.id
                  ? 'bg-gradient-neon border-transparent text-white shadow-neon'
                  : 'border-white/10 text-white/70'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {isLoading && <p className="text-center text-white/50 py-10">Memuat…</p>}

        <div className="grid grid-cols-2 gap-3 mt-2">
          {(data?.data ?? []).map((a: any) => (
            <AnimeCard
              key={a.mal_id}
              id={a.mal_id}
              title={a.title}
              image={a.images?.jpg?.image_url}
              score={a.score}
              type={a.type}
              episodes={a.episodes}
              footer={
                <div className="mt-2">
                  <p className="text-[10px] text-white/50 mb-1">
                    Tayang: {a.broadcast?.time ?? '—'} JST
                  </p>
                  <StatusPicker id={a.mal_id} title={a.title} image={a.images?.jpg?.image_url} />
                </div>
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
