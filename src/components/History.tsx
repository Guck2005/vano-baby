'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const steps = [
  { year: '2016', title: 'Le Gang prend vie', text: 'Tout a commencé ave Drague Azonto. Adigoue Gboun Gboun est sorti et le Bénin entier a retenu le nom. S\'en est suivi....', images: ['/img/history/2016.jpg', '/img/history/2016_1_1.jpg', '/img/history/2016_1_2.jpg', '/img/history/2016_2.jpg', '/img/history/2016_3.jpg', '/img/history/2016_4.jpg', '/img/history/2016_5.jpg'], cssClass: 'note-1', accent: 'accent-red' },
  { year: '2017', title: 'Les premières scènes', text: 'Je s\'en fou. Tonssimè chap. Vous repreniez les refrains sans même vous en rendre compte. C\'est là que j\'ai compris que notre histoire ne faisait que démarrer.', images: ['/img/history/2017_1.jpg', '/img/history/2017_2.jpg', '/img/history/2017_tonsimin.jpg', '/img/history/2017_jesenfou.jpg'], cssClass: 'note-2', accent: 'accent-ember' },
  { year: '2018', title: 'Les sons s\'installent', text: 'Bella. Vano wè. TchoKototoé. Les sons tournaient dans les villes, dans les quartiers, dans les agors. Puis en ......', images: ['/img/history/2018_1.jpg', '/img/history/2018_2.jpg', '/img/history/2018_3.jpg'], cssClass: 'note-3', accent: 'accent-bone' },
  { year: '2019', title: 'Le virage', text: 'Madame est arrivé et tout a changé. Nous vous avons prouvé ce jour-là qu\'un artiste qui n\'évolue pas disparaît. Vous avez suivi. Sans hésiter.', images: ['/img/history/2019_1.jpg', '/img/history/2019_2.jpg'], cssClass: 'note-4', accent: 'accent-red' },
  { year: '2020', title: 'Le sorcier vivant', text: 'Chéri Coco. Pas d\'amis. Nous avons continué à construire. Vous étiez là, derrière vos écrans, à streamer, à partager, à garder le Gang en vie.', images: ['/img/history/2020.jpg', '/img/history/2020_1.jpg', '/img/history/2020_2.jpg', '/img/history/2020_3.jpg'], cssClass: 'note-5', accent: 'accent-ember' },
  { year: '2021', title: '🏆 La première couronne', text: 'Bénin Top 10. Meilleur Artiste de l\'Année. Nous avons refusé d\'être nominés pendant des années  et quand nous avons accepté, nous avons gagné.', images: ['/img/history/2021_1.jpg', '/img/history/2021_2.jpg'], cssClass: 'note-6', accent: 'accent-bone' },
  { year: '2022', title: '🏆 Deux fois de suite', text: 'Personne n\'avait fait ça avant nous. Deux Bénin Top 10 consécutifs. Diyo explose à 2,6 millions de vues et nous l\'avons fêté lors de notre grand concert.', images: ['/img/history/2022_1.jpg', '/img/history/2022_2.jpg'], cssClass: 'note-7', accent: 'accent-red' },
  { year: '2023', title: '🏆 Trois ans sans s\'arrêter', text: 'Coup monté. C\'est toi. Nos sons tournaient partout, sur les chaînes, dans les salles de fête. Et pour la troisième fois, le Bénin Top 10 a dit notre nom.', images: ['/img/history/2023_1.jpg', '/img/history/2023_2.jpg', '/img/history/2023_3.jpg'], cssClass: 'note-8', accent: 'accent-ember' },
  { year: '2024', title: '🏆 Le quadruplé historique', text: 'Quatre années de suite. Meilleur Artiste de l\'Année, de nouveaux clips et sons sortis. Vous avez été témoins de l\'histoire.', images: ['/img/history/2024_1.jpg', '/img/history/2024_2.jpg', '/img/history/2024_3.jpg'], cssClass: 'note-9', accent: 'accent-bone' },
  { year: '2025', title: 'Azéto Gbèdé Music', text: 'Nous avons créé notre propre label. Nos règles. Notre vision. Nous avons crés de nouveaux sons et aujourd\'hui, .......', images: ['/img/history/2025_1.jpeg', '/img/history/2025_2.jpg'], cssClass: 'note-10', accent: 'accent-red' },
  { year: '2026', title: 'Le grand soir', text: 'Ensemble, nous ferons de ce 04 avril un soir dont le Bénin se souviendra longtemps.', images: ['/img/history/2026.jpeg'], cssClass: 'note-11 is-current', accent: 'accent-gold' }
];

export default function History() {
  const [activeSlides, setActiveSlides] = useState<Record<number, number>>({});
  const [isMobile, setIsMobile] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateViewport);
      return () => mediaQuery.removeEventListener('change', updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

  useEffect(() => {
    const cards = boardRef.current?.querySelectorAll<HTMLElement>('.story-note');
    if (!cards) return;

    if (isMobile) {
      cards.forEach((card) => card.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = Number(el.dataset.idx) * 150;
            setTimeout(() => el.classList.add('is-visible'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [isMobile]);

  const goToSlide = (cardIndex: number, slideIndex: number) => {
    setActiveSlides((prev) => ({ ...prev, [cardIndex]: slideIndex }));
  };

  const shiftSlide = (cardIndex: number, direction: number, total: number) => {
    const current = activeSlides[cardIndex] ?? 0;
    const next = (current + direction + total) % total;
    setActiveSlides((prev) => ({ ...prev, [cardIndex]: next }));
  };

  const renderStoryNote = (
    step: (typeof steps)[number],
    idx: number,
    forceVisible = false,
    keyValue?: string
  ) => {
    const currentSlide = activeSlides[idx] ?? 0;

    return (
      <article key={keyValue} className={`story-note ${step.cssClass}${forceVisible ? ' is-visible' : ''}`} data-idx={idx}>
        <div className="story-tape" aria-hidden="true" />
        <div className="story-card">
          <div className={`story-quote ${step.accent}`}>
            <div className="story-carousel">
              <div className="story-carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {step.images.map((image, imageIndex) => (
                  <div className="story-carousel-slide" key={`${step.year}-${imageIndex}`}>
                    <div className="story-quote-media">
                      <Image
                        src={image}
                        alt={`${step.title} ${imageIndex + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 240px"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="story-carousel-nav prev"
                onClick={() => shiftSlide(idx, -1, step.images.length)}
                aria-label={`Image precedente ${step.title}`}
              >
                ‹
              </button>
              <button
                type="button"
                className="story-carousel-nav next"
                onClick={() => shiftSlide(idx, 1, step.images.length)}
                aria-label={`Image suivante ${step.title}`}
              >
                ›
              </button>
            </div>
            <div className="story-carousel-dots">
              {step.images.map((_, imageIndex) => (
                <button
                  type="button"
                  key={`${step.year}-dot-${imageIndex}`}
                  className={`story-carousel-dot${currentSlide === imageIndex ? ' is-active' : ''}`}
                  onClick={() => goToSlide(idx, imageIndex)}
                  aria-label={`Aller a l'image ${imageIndex + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="story-meta-row">
            <div className="story-year">{step.year}</div>
            <div className="story-mini-tag">Archive</div>
          </div>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </div>
      </article>
    );
  };

  return (
    <section className="histoire-section" id="histoire">
      <div className="histoire-header">
        <div className="section-label">L'Artiste &amp; L'Histoire</div>
        <div className="histoire-heading-row">
          <div>
            <div className="histoire-count">10</div>
            <h2 className="histoire-title"><span className="red">MOMENTS</span> CLES</h2>
            
          </div>
          <div className="histoire-tag">Dix ans. Ce n'est pas juste un chiffre. C'est des nuits en studio, des scènes conquises une à une, des sons que vous avez repris sans qu'on vous le demande. Ce parcours, nous l'avons construit ensemble, vous et moi.</div>
        </div>
      </div>

      <div className="story-shell">
        <div className="story-board story-board--desktop" ref={boardRef}>
          {([steps.slice(0, 4), steps.slice(4, 8), steps.slice(8)] as const).map((group, rowIdx) => (
            <div key={rowIdx} className={`story-row${rowIdx === 2 ? ' story-row--last' : ''}`}>
              {rowIdx < 2 ? (
                <svg className="story-row-arc" aria-hidden="true" viewBox="0 0 1000 80" preserveAspectRatio="none">
                  <path id={`arc-${rowIdx}`} d="M125,40 Q250,5 375,40 Q500,75 625,40 Q750,5 875,40" fill="none" stroke="rgba(163,18,18,0.35)" strokeWidth="2.5" strokeDasharray="8 6" />
                  {['0s', '-1.5s', '-3s'].map((begin, bi) => (
                    <circle key={bi} r={7} fill="#ee2222" className="story-ball">
                      <animateMotion dur="18s" begin={begin} repeatCount="indefinite" rotate="auto"
                        keyPoints={rowIdx === 0 ? "0;1;1;1" : "0;0;1;1"}
                        keyTimes={rowIdx === 0 ? "0;0.33;0.34;1" : "0;0.33;0.66;1"}
                        calcMode="linear">
                        <mpath href={`#arc-${rowIdx}`} />
                      </animateMotion>
                      <animate attributeName="opacity"
                        values={rowIdx === 0 ? "0;1;1;0;0" : "0;0;0;1;1;0;0"}
                        keyTimes={rowIdx === 0 ? "0;0.02;0.31;0.33;1" : "0;0.33;0.35;0.37;0.64;0.66;1"}
                        dur="18s" begin={begin} repeatCount="indefinite" />
                    </circle>
                  ))}
                </svg>
              ) : (
                <svg className="story-row-arc" aria-hidden="true" viewBox="0 0 1000 80" preserveAspectRatio="none">
                  <path id="arc-2" d="M250,40 Q375,5 500,40 Q625,75 750,40" fill="none" stroke="rgba(163,18,18,0.35)" strokeWidth="2.5" strokeDasharray="8 6" />
                  {['0s', '-1.5s', '-3s'].map((begin, bi) => (
                    <circle key={bi} r={7} fill="#ee2222" className="story-ball">
                      <animateMotion dur="18s" begin={begin} repeatCount="indefinite" rotate="auto"
                        keyPoints="0;0;1;1"
                        keyTimes="0;0.66;0.99;1"
                        calcMode="linear">
                        <mpath href="#arc-2" />
                      </animateMotion>
                      <animate attributeName="opacity"
                        values="0;0;0;1;1;0"
                        keyTimes="0;0.66;0.68;0.70;0.97;1"
                        dur="18s" begin={begin} repeatCount="indefinite" />
                    </circle>
                  ))}
                </svg>
              )}
              {group.map((step, i) => {
                const idx = rowIdx * 4 + i;
                return renderStoryNote(step, idx, false, step.year);
              })}
            </div>
          ))}
        </div>

        <Carousel opts={{ align: 'center', loop: false }} className="story-board-mobile">
          <CarouselContent>
            {steps.map((step, idx) => (
              <CarouselItem key={`mobile-${step.year}`} className="story-board-mobile-item">
                {renderStoryNote(step, idx, true)}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="story-board-mobile-nav story-board-mobile-nav--prev" />
          <CarouselNext className="story-board-mobile-nav story-board-mobile-nav--next" />
        </Carousel>
      </div>

      <div className="histoire-cta">
        <a href="#billetterie" className="btn-main">
          Prendre mon ticket
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
