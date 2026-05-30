'use client';
import { useCountdown } from '@/hooks/useCountdown';

export function Countdown({ target, compact }: { target?: string | Date | null; compact?: boolean }) {
  const c = useCountdown(target);
  if (!c) return <span className="text-white/40 text-xs">—</span>;
  if (c.past) return <span className="text-pink-400 text-xs">Sudah tayang</span>;
  if (compact) {
    return (
      <span className="text-xs font-mono text-neon-cyan">
        {c.days > 0 ? `${c.days}h ` : ''}
        {String(c.hours).padStart(2, '0')}:{String(c.minutes).padStart(2, '0')}:{String(c.seconds).padStart(2, '0')}
      </span>
    );
  }
  return (
    <div className="flex gap-2 text-center font-mono">
      {[
        { v: c.days, l: 'Hari' },
        { v: c.hours, l: 'Jam' },
        { v: c.minutes, l: 'Menit' },
        { v: c.seconds, l: 'Detik' },
      ].map((x) => (
        <div key={x.l} className="glass rounded-lg px-3 py-1.5 min-w-[52px]">
          <div className="text-lg font-bold neon-text">{String(x.v).padStart(2, '0')}</div>
          <div className="text-[9px] uppercase tracking-wider text-white/60">{x.l}</div>
        </div>
      ))}
    </div>
  );
}
