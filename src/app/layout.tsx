import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { BottomNav } from '@/components/BottomNav';
import { FAB } from '@/components/FAB';
import { RegisterSW } from '@/components/RegisterSW';

export const metadata: Metadata = {
  title: 'AniQueue — Dashboard Uploader Anime',
  description:
    'Database anime lengkap, jadwal tayang waktu Indonesia (WIB/WITA/WIT), countdown realtime, dan dashboard uploader anime ongoing.',
  manifest: '/manifest.json',
  applicationName: 'AniQueue',
  appleWebApp: { capable: true, title: 'AniQueue', statusBarStyle: 'black-translucent' },
  openGraph: {
    title: 'AniQueue',
    description: 'Dashboard uploader anime & database anime lengkap',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a14',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-screen pb-24">
        <Providers>
          <RegisterSW />
          <main className="max-w-3xl mx-auto">{children}</main>
          <FAB />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
