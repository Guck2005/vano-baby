import Hero from '@/components/Hero';
import HypeStrip from '@/components/HypeStrip';
import Guests from '@/components/Guests';
import History from '@/components/History';
import FAQ from '@/components/FAQ';
import OwlChatbot from '@/components/OwlChatbot';

export default function Home() {
  return (
    <main>
      <Hero />
      <HypeStrip />
      <Guests />
      <History />
      <FAQ />
      <OwlChatbot />
    </main>
  );
}
