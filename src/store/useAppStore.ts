'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TZ } from '@/lib/timezone';

export type UploadStatus = 'belum' | 'encode' | 'upload' | 'sudah';
export type Priority = 'tinggi' | 'sedang' | 'rendah';
export type Collection = 'watchlist' | 'favorites' | 'planning' | 'completed' | 'dropped';

export interface TrackedAnime {
  id: number;
  title: string;
  image: string;
  episode?: number;
  status: UploadStatus;
  priority: Priority;
  collection: Collection;
  updatedAt: number;
}

interface State {
  timezone: TZ;
  setTimezone: (tz: TZ) => void;
  tracked: Record<number, TrackedAnime>;
  upsert: (a: Omit<TrackedAnime, 'updatedAt'>) => void;
  setStatus: (id: number, status: UploadStatus) => void;
  setPriority: (id: number, priority: Priority) => void;
  setCollection: (id: number, collection: Collection) => void;
  remove: (id: number) => void;
}

export const useAppStore = create<State>()(
  persist(
    (set) => ({
      timezone: 'Asia/Jakarta',
      setTimezone: (timezone) => set({ timezone }),
      tracked: {},
      upsert: (a) =>
        set((s) => ({
          tracked: { ...s.tracked, [a.id]: { ...a, updatedAt: Date.now() } },
        })),
      setStatus: (id, status) =>
        set((s) => {
          const cur = s.tracked[id];
          if (!cur) return s;
          return { tracked: { ...s.tracked, [id]: { ...cur, status, updatedAt: Date.now() } } };
        }),
      setPriority: (id, priority) =>
        set((s) => {
          const cur = s.tracked[id];
          if (!cur) return s;
          return { tracked: { ...s.tracked, [id]: { ...cur, priority, updatedAt: Date.now() } } };
        }),
      setCollection: (id, collection) =>
        set((s) => {
          const cur = s.tracked[id];
          if (!cur) return s;
          return { tracked: { ...s.tracked, [id]: { ...cur, collection, updatedAt: Date.now() } } };
        }),
      remove: (id) =>
        set((s) => {
          const next = { ...s.tracked };
          delete next[id];
          return { tracked: next };
        }),
    }),
    { name: 'anime-uploader-store' }
  )
);
