'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export interface AnimeCardProps {
  id: number;
  title: string;
  image: string;
  score?: number | null;
  type?: string;
  episodes?: number | null;
  badge?: string;
  footer?: React.ReactNode;
}

export function AnimeCard({ id, title, image, score, type, episodes, badge, footer }: AnimeCardProps) {
  return (
    <motion.div whileTap={{ scale: 0.97 }} className="card overflow-hidden">
      <Link href={`/anime/${id}`} className="block">
        <div className="relative aspect-[3/4] bg-bg-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          {badge && (
            <span className="absolute top-2 left-2 chip bg-gradient-neon text-white border-0 shadow-neon">
              {badge}
            </span>
          )}
          {score != null && (
            <span className="absolute top-2 right-2 chip flex items-center gap-1 bg-black/60">
              <Star size={10} className="text-yellow-400" />
              {score.toFixed(1)}
            </span>
          )}
        </div>
        <div className="p-2.5">
          <h3 className="text-xs font-semibold line-clamp-2 leading-tight">{title}</h3>
          <p className="text-[10px] text-white/50 mt-1">
            {type ?? 'TV'} {episodes ? `· ${episodes} eps` : ''}
          </p>
        </div>
      </Link>
      {footer && <div className="px-2.5 pb-2.5">{footer}</div>}
    </motion.div>
  );
}
