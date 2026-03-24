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
      <div className="acces-billetterie-bg">
        <Acces />
        <Billetterie />
      </div>
      <HypeStrip />
      <div className="history-acces-bg">
        <History />
      </div>
      <FAQ />
      <OwlChatbot />
      <footer className="site-footer">
        <div className="site-footer-shell">
          <p className="site-footer-line">
            Developpe dans le cadre de <span>Techchallenge</span>
          </p>
          <p className="site-footer-note">
            Ce site est realise comme exercice de demonstration.
          </p>
        </div>
      </footer>
    </main>
  );
}
