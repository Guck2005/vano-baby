import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import HypeStrip from '@/components/HypeStrip';

const Guests = dynamic(() => import('@/components/Guests'));
const Acces = dynamic(() => import('@/components/Acces'));
const Billetterie = dynamic(() => import('@/components/Billetterie'));
const History = dynamic(() => import('@/components/History'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const OwlChatbot = dynamic(() => import('@/components/OwlChatbot'));

export default function Home() {
  return (
    <main>
      <Hero />
      <HypeStrip />
      <Guests />
      <Acces />
      <Billetterie />
      <div className="history-acces-bg">
        <History />
      </div>
      <FAQ />
      <OwlChatbot />
    </main>
  );
}
