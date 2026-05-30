'use client';
import { useQuery } from '@tanstack/react-query';
import { jikan } from '@/lib/api';
import { Header } from '@/components/Header';
import { StatusPicker } from '@/components/StatusPicker';
import { useAppStore } from '@/store/useAppStore';
import { Star, Users, Trophy, Heart } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

export default function AnimeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const upsert = useAppStore((s) => s.upsert);

  const { data: full } = useQuery({ queryKey: ['anime', id], queryFn: () => jikan.detail(id) });
  const { data: chars } = useQuery({ queryKey: ['chars', id], queryFn: () => jikan.characters(id) });
  const { data: recs } = useQuery({ queryKey: ['recs', id], queryFn: () => jikan.recommendations(id) });
  const { data: rels } = useQuery({ queryKey: ['rels', id], queryFn: () => jikan.relations(id) });

  const a = full?.data;
  if (!a) return <p className="text-center text-white/50 py-20">Memuat…</p>;

  const addWatch = () =>
    upsert({
      id: a.mal_id,
      title: a.title,
      image: a.images?.jpg?.image_url,
      status: 'belum',
      priority: 'sedang',
      collection: 'watchlist',
    });

  return (
    <>
      <Header title="Detail" />
      <div className="relative">
        {a.trailer?.images?.maximum_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={a.trailer.images.maximum_image_url} alt="" className="w-full h-48 object-cover opacity-40" />
        )}
        <div className="px-4 -mt-20 relative">
          <div className="flex gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.images?.jpg?.large_image_url ?? a.images?.jpg?.image_url}
              alt={a.title}
              className="w-28 h-40 object-cover rounded-xl shadow-neon"
            />
            <div className="flex-1 pt-16">
              <h1 className="text-lg font-bold leading-tight">{a.title}</h1>
              <p className="text-xs text-white/60 mt-0.5">{a.title_japanese}</p>
              <p className="text-xs text-white/60">{a.title_english}</p>
              <div className="flex gap-1.5 flex-wrap mt-2">
                <span className="chip">{a.type}</span>
                <span className="chip">{a.status}</span>
                {a.season && <span className="chip">{a.season} {a.year}</span>}
              </div>
            </div>
          </div>

          <button onClick={addWatch} className="btn-neon w-full mt-4">+ Tambah ke Watchlist</button>

          <div className="mt-3">
            <StatusPicker id={a.mal_id} title={a.title} image={a.images?.jpg?.image_url} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mt-4 text-center">
            {[
              { icon: Star, l: 'Score', v: a.score ?? '—' },
              { icon: Trophy, l: 'Rank', v: a.rank ? `#${a.rank}` : '—' },
              { icon: Users, l: 'Member', v: a.members ? Math.round(a.members / 1000) + 'k' : '—' },
              { icon: Heart, l: 'Favorit', v: a.favorites ? Math.round(a.favorites / 1000) + 'k' : '—' },
            ].map((s) => (
              <div key={s.l} className="card p-2">
                <s.icon size={14} className="mx-auto text-neon-cyan" />
                <div className="text-sm font-bold mt-1">{s.v}</div>
                <div className="text-[9px] text-white/60">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Synopsis */}
          {a.synopsis && (
            <section className="card p-4 mt-4">
              <h2 className="font-semibold mb-2">Sinopsis</h2>
              <p className="text-sm text-white/80 leading-relaxed">{a.synopsis}</p>
            </section>
          )}

          {/* Produksi */}
          <section className="card p-4 mt-4 text-sm space-y-1">
            <h2 className="font-semibold mb-2">Produksi & Penayangan</h2>
            <p><span className="text-white/50">Studio:</span> {a.studios?.map((s: any) => s.name).join(', ') || '—'}</p>
            <p><span className="text-white/50">Producer:</span> {a.producers?.map((s: any) => s.name).join(', ') || '—'}</p>
            <p><span className="text-white/50">Source:</span> {a.source || '—'}</p>
            <p><span className="text-white/50">Episode:</span> {a.episodes ?? '—'} · {a.duration}</p>
            <p><span className="text-white/50">Broadcast:</span> {a.broadcast?.string || '—'}</p>
          </section>

          {/* Genre */}
          <section className="mt-4">
            <h2 className="font-semibold mb-2">Genre & Tema</h2>
            <div className="flex gap-1.5 flex-wrap">
              {[...(a.genres ?? []), ...(a.themes ?? []), ...(a.demographics ?? [])].map((g: any) => (
                <span key={g.mal_id} className="chip">{g.name}</span>
              ))}
            </div>
          </section>

          {/* Trailer */}
          {a.trailer?.embed_url && (
            <section className="mt-4">
              <h2 className="font-semibold mb-2">Trailer</h2>
              <div className="aspect-video rounded-xl overflow-hidden glass">
                <iframe src={a.trailer.embed_url} className="w-full h-full" allowFullScreen />
              </div>
            </section>
          )}

          {/* Characters */}
          {chars?.data?.length > 0 && (
            <section className="mt-4">
              <h2 className="font-semibold mb-2">Karakter & Seiyuu</h2>
              <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2">
                {chars.data.slice(0, 12).map((c: any) => (
                  <div key={c.character.mal_id} className="w-24 shrink-0 text-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.character.images?.jpg?.image_url} alt="" className="w-24 h-32 object-cover rounded-lg" />
                    <p className="text-[10px] mt-1 line-clamp-2">{c.character.name}</p>
                    <p className="text-[9px] text-white/50 line-clamp-1">{c.voice_actors?.[0]?.person?.name}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Relations */}
          {rels?.data?.length > 0 && (
            <section className="mt-4">
              <h2 className="font-semibold mb-2">Relasi Anime</h2>
              <div className="space-y-1.5">
                {rels.data.map((r: any) => (
                  <div key={r.relation} className="card p-2.5 text-sm">
                    <p className="text-xs text-neon-cyan mb-1">{r.relation}</p>
                    <div className="flex gap-2 flex-wrap">
                      {r.entry.map((e: any) =>
                        e.type === 'anime' ? (
                          <Link key={e.mal_id} href={`/anime/${e.mal_id}`} className="chip">
                            {e.name}
                          </Link>
                        ) : (
                          <span key={e.mal_id} className="chip opacity-50">{e.name}</span>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recommendations */}
          {recs?.data?.length > 0 && (
            <section className="mt-4">
              <h2 className="font-semibold mb-2">Rekomendasi</h2>
              <div className="grid grid-cols-3 gap-2">
                {recs.data.slice(0, 9).map((r: any) => (
                  <Link key={r.entry.mal_id} href={`/anime/${r.entry.mal_id}`} className="card overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.entry.images?.jpg?.image_url} alt="" className="w-full aspect-[3/4] object-cover" />
                    <p className="text-[10px] p-2 line-clamp-2">{r.entry.title}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
