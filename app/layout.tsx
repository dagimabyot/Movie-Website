import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MoviesHub - Your Ultimate Movie Destination',
  description: 'Discover and watch 100+ movies with YouTube trailers. Stream trailers, discover new releases, and explore a vast collection of professional-grade films.',
  keywords: 'movies, tv shows, trailers, streaming, entertainment, youtube trailers, movie database',
  authors: [{ name: 'MoviesHub Team' }],
  creator: 'MoviesHub',
  publisher: 'MoviesHub',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://movieshub.com',
    title: 'MoviesHub - Your Ultimate Movie Destination',
    description: 'Discover and watch 100+ movies with YouTube trailers',
    siteName: 'MoviesHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoviesHub - Your Ultimate Movie Destination',
    description: 'Discover and watch 100+ movies with YouTube trailers',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffd700',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23ffd700'>🎬</text></svg>" />
      </head>
      <body className="bg-dark-bg text-white antialiased">{children}</body>
    </html>
  );
}
