import type { Metadata } from 'next';
import { Syne, Bebas_Neue, Space_Mono, Carattere } from 'next/font/google';
import './globals.css';

const syne = Syne({ 
  subsets: ['latin'], 
  variable: '--font-syne' 
});

const bebasNeue = Bebas_Neue({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-bebas-neue' 
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono'
});

const carattere = Carattere({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-carattere',
});

export const metadata: Metadata = {
  title: 'Vano Baby — Hero',
  description: 'Concert Live — Édition Anniversaire: 10 ANS DU GANG',
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
