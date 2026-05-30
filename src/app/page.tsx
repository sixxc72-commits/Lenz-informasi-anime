'use client';
import { useQuery } from '@tanstack/react-query';
import { jikan } from '@/lib/api';
import { Header } from '@/components/Header';
import { AnimeCard } from '@/components/AnimeCard';
import { Countdown } from '@/components/Countdown';
import { useAppStore } from '@/store/useAppStore';
import { formatLocal } from '@/lib/timezone';
import Link from 'next/link';
import { Flame, Calendar, CheckCircle2, Clock, AlertTriangle, Star } from 'lucide-react';

function nextAirDate(a: any): Date | null {
  const ts = a?.broadcast?.time;
  const day = a?.broadcast?.day; // e.g. "Mondays"
  if (!ts || !day) return null;
  const dayMap: Record<string, number> = {
    Sundays: 0, Mondays: 1, Tuesdays: 2, Wednesdays: 3, Thursdays: 4, Fridays: 5, Saturdays: 6,
  };
  const target = dayMap[day];
  if (target === undefined) return null;
  const [h, m] = ts.split(':').map(Number);
  // JST (UTC+9) → ke UTC
  const now = new Date();
  const d = new Date(now);
  const diff = (target - now.getUTCDay() + 7) % 7;
  d.setUTCDate(now.getUTCDate() + diff);
  d.setUTCHours(h - 9, m, 0, 0);
  if (d.getTime() < now.getTime()) d.setUTCDate(d.getUTCDate() + 7);
  return d;
}

export default function HomePage() {
  const tz = useAppStore((s) => s.timezone);
  const tracked = useAppStore((s) => s.tracked);

  const { data: seasonal } = useQuery({
    queryKey: ['season-now'],
    queryFn: () => jikan.seasonNow(),
  });
  const { data: top } = useQuery({ queryKey: ['top'], queryFn: () => jikan.topAnime(1) });

  const ongoing: any[] = seasonal?.data ?? [];
  const withDates = ongoing
    .map((a) => ({ a, d: nextAirDate(a) }))
    .filter((x) => x.d)
    .sort((a, b) => a.d!.getTime() - b.d!.getTime());

  const hero = withDates[0];

  const list = Object.values(tracked);
  const stats = {
    ongoing: ongoing.length,
    today: withDates.filter((x) => x.d!.toDateString() === new Date().toDateString()).length,
    belum: list.filter((t) => t.status === 'belum').length,
    sudah: list.filter((t) => t.status === 'sudah').length,
    tinggi: list.filter((t) => t.priority === 'tinggi').length,
    terlambat: list.filter((t) => t.status !== 'sudah').length,
  };

  return (
    <>
      <Header title="Beranda" />
      <div className="px-4 pt-4 space-y-6">
        {/* HERO */}
        {hero && (
          <Link href={`/anime/${hero.a.mal_id}`} className="block">
            <div className="relative overflow-hidden rounded-3xl glass shadow-glow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero.a.images?.jpg?.large_image_url ?? hero.a.images?.jpg?.image_url}
                alt={hero.a.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative p-5 min-h-[260px] flex flex-col justify-end bg-gradient-to-t from-bg via-bg/70 to-transparent">
                <span className="chip bg-gradient-neon border-0 w-fit mb-2">Tayang Berikutnya</span>
                <h2 className="text-xl font-bold line-clamp-2">{hero.a.title}</h2>
                <p className="text-xs text-white/70 mt-1">{formatLocal(hero.d!, tz)}</p>
                <div className="mt-3">
                  <Countdown target={hero.d} />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* STATS */}
        <section className="grid grid-cols-3 gap-2">
          {[
            { label: 'Ongoing', value: stats.ongoing, icon: Flame, color: 'text-neon-pink' },
            { label: 'Hari Ini', value: stats.today, icon: Calendar, color: 'text-neon-cyan' },
            { label: 'Belum Upload', value: stats.belum, icon: Clock, color: 'text-yellow-400' },
            { label: 'Sudah Upload', value: stats.sudah, icon: CheckCircle2, color: 'text-emerald-400' },
            { label: 'Prioritas', value: stats.tinggi, icon: Star, color: 'text-neon-purple' },
            { label: 'Terlambat', value: stats.terlambat, icon: AlertTriangle, color: 'text-red-400' },
          ].map((s) => (
            <div key={s.label} className="card p-3">
              <s.icon size={16} className={s.color} />
              <div className="text-xl font-bold mt-1">{s.value}</div>
              <div className="text-[10px] text-white/60">{s.label}</div>
            </div>
          ))}
        </section>

        {/* TRENDING */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Trending Sekarang</h2>
            <Link href="/schedule" className="text-xs text-neon-cyan">Lihat jadwal →</Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(top?.data ?? []).slice(0, 6).map((a: any) => (
              <AnimeCard
                key={a.mal_id}
                id={a.mal_id}
                title={a.title}
                image={a.images?.jpg?.image_url}
                score={a.score}
                type={a.type}
                episodes={a.episodes}
                badge={a.popularity && a.popularity < 100 ? 'Trending' : undefined}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
