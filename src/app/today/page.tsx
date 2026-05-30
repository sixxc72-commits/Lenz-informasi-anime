'use client';
import { useQuery } from '@tanstack/react-query';
import { jikan } from '@/lib/api';
import { Header } from '@/components/Header';
import { Countdown } from '@/components/Countdown';
import { StatusPicker } from '@/components/StatusPicker';
import { useAppStore } from '@/store/useAppStore';
import { formatTime, TZ_LABEL } from '@/lib/timezone';
import Link from 'next/link';

const DAYS_API = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

function nextAirDate(a: any): Date | null {
  const ts = a?.broadcast?.time;
  if (!ts) return null;
  const [h, m] = ts.split(':').map(Number);
  const now = new Date();
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), h - 9, m));
  if (d.getTime() < now.getTime() - 12 * 3600_000) d.setUTCDate(d.getUTCDate() + 1);
  return d;
}

export default function TodayPage() {
  const tz = useAppStore((s) => s.timezone);
  const tracked = useAppStore((s) => s.tracked);
  const today = DAYS_API[new Date().getDay()];
  const { data, isLoading } = useQuery({ queryKey: ['schedule', today], queryFn: () => jikan.schedule(today) });

  const items = (data?.data ?? [])
    .map((a: any) => ({ a, d: nextAirDate(a) }))
    .sort((x: any, y: any) => (x.d?.getTime() ?? 0) - (y.d?.getTime() ?? 0));

  return (
    <>
      <Header title="Hari Ini" />
      <div className="px-4 pt-4">
        <p className="text-sm text-white/70 mb-3">
          Anime tayang hari ini dalam {TZ_LABEL[tz]}. Urut dari yang paling dekat.
        </p>
        {isLoading && <p className="text-center text-white/50 py-10">Memuat…</p>}
        <ul className="space-y-2">
          {items.map(({ a, d }: any) => {
            const t = tracked[a.mal_id];
            const ring =
              t?.status === 'sudah'
                ? 'border-emerald-500/40'
                : t?.priority === 'tinggi'
                ? 'border-neon-purple/50'
                : 'border-white/10';
            return (
              <li key={a.mal_id} className={`card border ${ring} p-3 flex gap-3`}>
                <Link href={`/anime/${a.mal_id}`} className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.images?.jpg?.image_url}
                    alt={a.title}
                    className="w-16 h-20 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/anime/${a.mal_id}`} className="block">
                    <h3 className="text-sm font-semibold line-clamp-2">{a.title}</h3>
                  </Link>
                  <p className="text-[11px] text-white/60 mt-0.5">
                    {d ? `${formatTime(d, tz)} ${TZ_LABEL[tz]}` : '—'}
                  </p>
                  <div className="mt-1">
                    <Countdown target={d} compact />
                  </div>
                  <div className="mt-2">
                    <StatusPicker id={a.mal_id} title={a.title} image={a.images?.jpg?.image_url} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
