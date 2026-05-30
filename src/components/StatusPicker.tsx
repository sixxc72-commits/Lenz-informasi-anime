'use client';
import { useAppStore, type UploadStatus } from '@/store/useAppStore';

const opts: { value: UploadStatus; label: string; color: string }[] = [
  { value: 'belum', label: 'Belum', color: 'bg-white/10' },
  { value: 'encode', label: 'Encode', color: 'bg-blue-500/30' },
  { value: 'upload', label: 'Upload', color: 'bg-purple-500/30' },
  { value: 'sudah', label: 'Sudah', color: 'bg-emerald-500/30' },
];

export function StatusPicker({ id, title, image }: { id: number; title: string; image: string }) {
  const tracked = useAppStore((s) => s.tracked[id]);
  const upsert = useAppStore((s) => s.upsert);
  const setStatus = useAppStore((s) => s.setStatus);

  const cur = tracked?.status ?? 'belum';
  const set = (v: UploadStatus) => {
    if (!tracked) upsert({ id, title, image, status: v, priority: 'sedang', collection: 'watchlist' });
    else setStatus(id, v);
  };
  return (
    <div className="flex gap-1 flex-wrap">
      {opts.map((o) => (
        <button
          key={o.value}
          onClick={(e) => {
            e.preventDefault();
            set(o.value);
          }}
          className={`text-[10px] px-2 py-1 rounded-full border border-white/10 transition ${
            cur === o.value ? `${o.color} text-white` : 'text-white/60'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
