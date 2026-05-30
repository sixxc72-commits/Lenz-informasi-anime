'use client';
import { Header } from '@/components/Header';
import { useAppStore } from '@/store/useAppStore';
import { TZ_OPTIONS, type TZ } from '@/lib/timezone';
import { Bell, Github, Smartphone } from 'lucide-react';

export default function SettingsPage() {
  const tz = useAppStore((s) => s.timezone);
  const setTz = useAppStore((s) => s.setTimezone);

  const enableNotifs = async () => {
    if (!('Notification' in window)) return alert('Browser tidak mendukung notifikasi');
    const p = await Notification.requestPermission();
    if (p === 'granted') new Notification('AniQueue', { body: 'Notifikasi diaktifkan ✅' });
  };

  return (
    <>
      <Header title="Setelan" />
      <div className="px-4 pt-4 space-y-4">
        <section className="card p-4">
          <h2 className="font-semibold mb-3">Zona Waktu Indonesia</h2>
          <div className="grid grid-cols-3 gap-2">
            {TZ_OPTIONS.map((o) => (
              <button
                key={o.value}
                onClick={() => setTz(o.value as TZ)}
                className={`p-3 rounded-xl border text-center transition ${
                  tz === o.value
                    ? 'bg-gradient-neon border-transparent shadow-neon'
                    : 'border-white/10 text-white/70'
                }`}
              >
                <div className="font-bold">{o.label}</div>
                <div className="text-[10px] opacity-70">{o.utc}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="card p-4 space-y-3">
          <h2 className="font-semibold">Notifikasi</h2>
          <button onClick={enableNotifs} className="btn-neon w-full flex items-center justify-center gap-2">
            <Bell size={16} /> Aktifkan Notifikasi
          </button>
          <p className="text-[11px] text-white/50">
            Reminder 60 menit sebelum tayang, saat tayang, dan ringkasan upload harian.
          </p>
        </section>

        <section className="card p-4">
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <Smartphone size={16} /> Pasang ke Android
          </h2>
          <p className="text-xs text-white/60">
            Buka menu browser → <b>Tambahkan ke Layar Utama</b> untuk pengalaman seperti aplikasi.
          </p>
        </section>

        <section className="card p-4">
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            <Github size={16} /> Tentang
          </h2>
          <p className="text-xs text-white/60">
            AniQueue — Dashboard Uploader Anime. Data oleh Jikan API (MyAnimeList).
          </p>
        </section>
      </div>
    </>
  );
}
