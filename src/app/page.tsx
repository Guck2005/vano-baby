import Loader from '@/components/Loader';
import Hero from '@/components/Hero';
import HypeStrip from '@/components/HypeStrip';
import Guests from '@/components/Guests';
import History from '@/components/History';
import Acces from '@/components/Acces';
import FAQ from '@/components/FAQ';
import OwlChatbot from '@/components/OwlChatbot';

export default function Home() {
  return (
    <main>
      <Loader />
      <Hero />
      <HypeStrip />
      <Guests />
      <History />
      <Acces />
      <FAQ />
      <OwlChatbot />
    </main>
  );
}
