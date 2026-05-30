# AniQueue — Dashboard Uploader Anime

Website mobile-first untuk uploader anime & database anime lengkap (Jikan API v4).

## Stack
- **Next.js 14** (App Router) + React 18 + TypeScript
- **Tailwind CSS** dengan tema Dark Premium + Neon Purple/Blue + Glassmorphism
- **TanStack Query** untuk caching & data-fetching
- **Zustand** (persist localStorage) untuk watchlist, status upload, prioritas, zona waktu
- **Framer Motion** untuk animasi
- **date-fns-tz** konversi otomatis ke WIB / WITA / WIT
- **PWA**: manifest + service worker (offline cache + push)

## Fitur Utama
- **Bottom Navigation** permanen (Home, Jadwal, Cari, Hari Ini, Watchlist, Setelan)
- **Floating Action Button** (Quick action 5 menu)
- **Home Dashboard** dengan Hero anime berikutnya + countdown realtime + 6 quick stats
- **Schedule (LiveChart style)** per hari Senin–Minggu, chip filter horizontal
- **Today's Upload** untuk uploader: urut waktu tayang Indonesia, status 1-tap
- **Global Search** dengan debounce 400ms (judul, romaji, english, alias)
- **Anime Detail Lengkap**: poster, banner, sinopsis, produksi, statistik, genre, trailer, karakter+seiyuu, relasi, rekomendasi
- **Watchlist & Koleksi**: Watchlist / Favorit / Planning / Selesai / Dropped + prioritas tinggi/sedang/rendah
- **Upload Tracker**: Belum → Encode → Upload → Sudah (1 tap)
- **Zona Waktu Indonesia**: WIB (default), WITA, WIT — countdown lokal realtime
- **Bahasa Indonesia**: nama hari, bulan, format tanggal
- **PWA**: install ke Android, offline cache, push notification
- **Modular API**: semua endpoint Jikan terpusat di `src/lib/api.ts`

## Setup
```bash
npm install   # atau bun install / pnpm install
npm run dev
```

Buka http://localhost:3000

## Build Production
```bash
npm run build && npm start
```

Siap deploy ke Vercel.

## Struktur Folder
```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root + providers + bottom nav + FAB
│   ├── page.tsx         # Home dashboard
│   ├── schedule/        # Jadwal mingguan
│   ├── search/          # Pencarian global
│   ├── today/           # Uploader: hari ini
│   ├── watchlist/       # Koleksi & status
│   ├── settings/        # Zona waktu, notif
│   └── anime/[id]/      # Detail lengkap
├── components/          # AnimeCard, Countdown, BottomNav, FAB, ...
├── lib/
│   ├── api.ts           # 🔑 Endpoint Jikan terpusat
│   ├── timezone.ts      # Konversi WIB/WITA/WIT
│   └── utils.ts
├── store/useAppStore.ts # Zustand + persist
└── hooks/useCountdown.ts
public/
├── manifest.json        # PWA
├── sw.js                # Service Worker
└── icons/               # ⚠️ Tambah icon-192.png & icon-512.png
```

## Catatan
- **Icon PWA**: tambahkan `public/icons/icon-192.png` dan `icon-512.png` sebelum publish.
- **Notifikasi 60 menit sebelum tayang**: aktifkan di halaman Setelan, kemudian integrasikan dengan logic countdown (hook `useCountdown` + `Notification` API).
- **Discord / Telegram webhook**: tambahkan di `src/lib/notify.ts` (opsional, sesuai kebutuhan).
- API base URL dapat diganti dengan mudah di `src/lib/api.ts` (`API_CONFIG.BASE_URL`).
