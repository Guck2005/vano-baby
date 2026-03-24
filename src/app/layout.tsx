import type { Metadata, Viewport } from 'next';
import { Syne, Bebas_Neue, Space_Mono, Carattere } from 'next/font/google';
import './globals.css';

const syne = Syne({ 
  subsets: ['latin'], 
  variable: '--font-syne',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-bebas-neue',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

const carattere = Carattere({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-carattere',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0f0f',
};

export const metadata: Metadata = {
  title: 'Vano Baby — 10 Ans du Gang',
  description: 'Concert Live — Édition Anniversaire: 10 ANS DU GANG — 04 Avril 2026',
  metadataBase: new URL('https://vano-baby.vercel.app'),
  openGraph: {
    title: 'Vano Baby — 10 Ans du Gang',
    description: 'Concert Live — Édition Anniversaire: 10 ANS DU GANG — 04 Avril 2026',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${bebasNeue.variable} ${spaceMono.variable} ${carattere.variable}`}>
      <body>{children}</body>
    </html>
  );
}
