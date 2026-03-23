'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

const guests = [
  { name: 'Fanicko', role: 'Invite confirme', img: '/img/guest/fanicko.jpg', stat: '31K' },
  { name: 'Guest Prime', role: 'Line-up secret', img: '/img/hero_image.png', stat: '28K' },
  { name: 'Vano Baby', role: 'Artiste principal', img: '/img/hero_image.png', stat: '50K' },
  { name: 'Legend X', role: 'Feat exclusif', img: '/img/background_histoire.png', stat: '47K' },
  { name: 'Guest Mystic', role: 'Performance live', img: '/img/background_hero.png', stat: '19K' },
  { name: 'Special K', role: 'Set surprise', img: '/img/hero_image.png', stat: '23K' },
  { name: 'Reveal Soon', role: 'Annonce a venir', img: '/img/background_hero.png', stat: '17K' },
];

function modulo(index: number, length: number) {
  return (index + length) % length;
}

export default function Guests() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragDeltaX = useRef(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const sync = () => {
      setIsMobile(mediaQuery.matches);
      dragStartX.current = null;
      dragDeltaX.current = 0;
      setIsDragging(false);
      setDragOffset(0);
    };

    sync();
    mediaQuery.addEventListener('change', sync);

    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  const visibleGuests = useMemo(() => {
    const total = guests.length;
    return [
      guests[modulo(activeIndex - 3, total)],
      guests[modulo(activeIndex - 2, total)],
      guests[modulo(activeIndex - 1, total)],
      guests[activeIndex],
      guests[modulo(activeIndex + 1, total)],
      guests[modulo(activeIndex + 2, total)],
      guests[modulo(activeIndex + 3, total)],
    ];
  }, [activeIndex]);

  const snapTo = (direction: -1 | 1) => {
    if (isAnimating.current) return;

    isAnimating.current = true;
    setIsDragging(false);
    setDragOffset(direction === 1 ? -96 : 96);

    window.setTimeout(() => {
      setIsResetting(true);
      setActiveIndex((current) => modulo(current + direction, guests.length));
      setDragOffset(0);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsResetting(false);
          isAnimating.current = false;
        });
      });
    }, 210);
  };

  const goPrev = () => snapTo(-1);
  const goNext = () => snapTo(1);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (isAnimating.current) return;
    dragStartX.current = event.clientX;
    dragDeltaX.current = 0;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile) return;
    if (dragStartX.current === null) return;
    dragDeltaX.current = event.clientX - dragStartX.current;
    setDragOffset(Math.max(-110, Math.min(110, dragDeltaX.current * 0.72)));
  };

  const handlePointerEnd = () => {
    if (isMobile) return;
    if (dragStartX.current === null) return;

    if (dragDeltaX.current <= -50) {
      goNext();
    } else if (dragDeltaX.current >= 50) {
      goPrev();
    } else {
      setIsDragging(false);
      setDragOffset(0);
    }

    dragStartX.current = null;
    dragDeltaX.current = 0;
  };

  return (
    <section className="guests-section">
      <div className="guests-shell">
        <div className="guests-copy-card">
          <div>
            <div className="guests-label">Invites & line-up</div>
            <h2 className="guests-title">Popular this week</h2>
          </div>
        </div>

        <div
          className={`guests-card-row${isDragging ? ' is-dragging' : ''}${isResetting ? ' is-resetting' : ''}`}
          style={{ '--guests-drag-offset': `${dragOffset}px` } as React.CSSProperties}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={handlePointerEnd}
        >
          <div className="guests-controls guests-controls-inline" aria-label="Navigation carousel invites">
            <button
              type="button"
              className="guests-control-btn"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={goPrev}
              aria-label="Invite precedent"
            >
              <span aria-hidden="true">{'<'}</span>
            </button>
            <button
              type="button"
              className="guests-control-btn"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={goNext}
              aria-label="Invite suivant"
            >
              <span aria-hidden="true">{'>'}</span>
            </button>
          </div>

          {visibleGuests.map((guest, index) => {
            const isFeatured = index === 3;

            return (
              <article
                key={`${guest.name}-${index}`}
                className={`guests-spotlight-card${isFeatured ? ' is-featured' : ''}`}
              >
                <div className="guests-spotlight-glow" />
                <div className="guests-spotlight-media">
                  <Image
                    src={guest.img}
                    alt={guest.name}
                    fill
                    sizes={isFeatured ? '(max-width: 768px) 72vw, 260px' : '(max-width: 768px) 38vw, 170px'}
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
            );
          })}
        </div>

        <div className="guests-ticket-cta">
          <a href="#" className="guests-ticket-btn">
            Prendre mon ticket
          </a>
        </div>
      </div>
    </section>
  );
}
