'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from '@/components/ui/carousel';

const guests = [
  { name: 'Fanicko',      role: 'Invite confirme',   img: '/img/guest/fanicko.jpg',         stat: '31K' },
  { name: 'Nikanor',      role: 'Invite confirme',   img: '/img/guest/Nikanor.jpg',          stat: '28K' },
  { name: 'Togbé Yéton',  role: 'Invite confirme',   img: '/img/guest/Togbe_Yéton.jpg',      stat: '47K' },
  { name: 'Conex & Don',  role: 'Invite confirme',   img: '/img/guest/Conex&Don.jpg',        stat: '23K' },
  { name: 'Bobo Wê',      role: 'Invite confirme',   img: '/img/guest/Bobo_Wê.jpg',          stat: '19K' },
  { name: 'Axel Merryl',  role: 'Invite confirme',   img: '/img/guest/Axel_Merryl.jpg',      stat: '25K' },
  { name: 'Zeynab',       role: 'Invite confirme',   img: '/img/guest/Zeynab.jpg',           stat: '22K' },
  { name: 'Ahoôto',       role: 'Invite confirme',   img: '/img/guest/ahoôto.jpg',           stat: '17K' },
  { name: 'Sessimè',      role: 'Invite confirme',   img: '/img/guest/Sessimè.jpg',          stat: '34K' },
];

function GuestsInner({ onOpen }: { onOpen: (src: string, alt: string) => void }) {
  const { selectedIndex } = useCarousel();

  return (
    <>
      <CarouselContent>
        {guests.map((guest, index) => (
          <CarouselItem key={guest.name} className="guests-carousel-item">
            <article
                className={`guests-spotlight-card${index === selectedIndex ? ' is-active' : ''}`}
                onClick={() => onOpen(guest.img, guest.name)}
                style={{ cursor: 'pointer' }}
              >
              <div className="guests-spotlight-glow" />
              <div className="guests-spotlight-media">
                <Image
                  src={guest.img}
                  alt={guest.name}
                  fill
                  sizes="(max-width: 768px) 72vw, 260px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="guests-spotlight-copy">
                <div className="guests-spotlight-name">{guest.name}</div>
                <div className="guests-spotlight-meta">
                  <span>{guest.role}</span>
                  <span>{guest.stat}</span>
                </div>
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </>
  );
}

export default function Guests() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section className="guests-section" id="guests">
      <div className="guests-shell">

        <div className="guests-copy-card">
          <div>
            <div className="guests-label">Guests &amp; line-up</div>
            <h2 className="guests-title">Tout <span className="red">Le Gang</span> Sera là</h2>
          </div>
        </div>

        <Carousel opts={{ align: 'center', loop: true }} className="guests-carousel">
          <GuestsInner onOpen={(src, alt) => setLightbox({ src, alt })} />
        </Carousel>

        {lightbox && (
          <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
        )}

        <div className="guests-ticket-cta">
          <a href="#billetterie" className="btn-main">
            Prendre mon ticket
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 7.5H12M8.5 4L12 7.5L8.5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
