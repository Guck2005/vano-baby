'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const steps = [
  { year: '2016', title: 'Le gang prend vie', text: 'Les premieres apparitions installent une voix, une attitude et une energie qui commencent deja a marquer la scene.', images: ['/img/history/2016.jpg', '/img/history/2016_1_1.jpg', '/img/history/2016_1_2.jpg', '/img/history/2016_2.jpg', '/img/history/2016_3.jpg', '/img/history/2016_4.jpg', '/img/history/2016_5.jpg'], cssClass: 'note-1', accent: 'accent-red' },
  { year: '2017', title: 'Premieres scenes', text: 'Le public decouvre une presence forte sur scene, avec un style direct et des performances qui accrochent.', images: ['/img/history/2017_1.jpg', '/img/history/2017_2.jpg', '/img/history/2017_tonsimin.jpg', '/img/history/2017_jesenfou.jpg'], cssClass: 'note-2', accent: 'accent-ember' },
  { year: '2018', title: 'Les titres s imposent', text: 'Les morceaux circulent, la base de fans grossit et l identite artistique commence a devenir incontournable.', images: ['/img/history/2018_1.jpg', '/img/history/2018_2.jpg', '/img/history/2018_3.jpg'], cssClass: 'note-3', accent: 'accent-bone' },
  { year: '2019', title: 'Le rayonnement s elargit', text: 'Les collaborations, les passages remarques et la notoriete installent Vano Baby dans une autre dimension.', images: ['/img/history/2019_1.jpg', '/img/history/2019_2.jpg'], cssClass: 'note-4', accent: 'accent-red' },
  { year: '2020', title: 'L identite s affirme', text: 'Le style, l attitude et le ton deviennent plus reconnaissables, avec une image qui marque davantage les esprits.', images: ['/img/history/2020.jpg', '/img/history/2020_1.jpg', '/img/history/2020_2.jpg', '/img/history/2020_3.jpg'], cssClass: 'note-5', accent: 'accent-ember' },
  { year: '2021', title: 'Un nouveau souffle', text: 'Le son evolue, les visuels se renforcent et chaque sortie affirme un univers plus ambitieux et plus mature.', images: ['/img/history/2021_1.jpg', '/img/history/2021_2.jpg'], cssClass: 'note-6', accent: 'accent-bone' },
  { year: '2022', title: 'La reconnaissance', text: 'Le parcours prend une autre ampleur et les moments forts s enchainent avec une vraie reconnaissance populaire.', images: ['/img/history/2022_1.jpg', '/img/history/2022_2.jpg'], cssClass: 'note-7', accent: 'accent-red' },
  { year: '2023', title: 'La scene grandit', text: 'Les performances deviennent plus fortes, plus attendues et plus memorables a chaque passage.', images: ['/img/history/2023_1.jpg', '/img/history/2023_2.jpg', '/img/history/2023_3.jpg'], cssClass: 'note-8', accent: 'accent-ember' },
  { year: '2024', title: 'L elan se confirme', text: 'Les sorties et les lives de 2024 posent les bases d une annee anniversaire qui s annonce historique.', images: ['/img/history/2024_1.jpg', '/img/history/2024_2.jpg', '/img/history/2024_3.jpg'], cssClass: 'note-9', accent: 'accent-bone' },
  { year: '2025', title: 'L annee decisive', text: 'Tout converge vers une celebration a grande echelle, pensee comme un moment fort pour les fans et le parcours.', images: ['/img/history/2025_1.jpeg', '/img/history/2025_2.jpg'], cssClass: 'note-10', accent: 'accent-red' },
  { year: '2026', title: 'Le grand soir', text: 'Le 04 avril 2026 devient le point culminant de cette decennie: un concert manifeste pour celebrer 10 ans du gang.', images: ['/img/history/2026.jpeg'], cssClass: 'note-11 is-current', accent: 'accent-gold' }
];

export default function History() {
  const [activeSlides, setActiveSlides] = useState<Record<number, number>>({});
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = boardRef.current?.querySelectorAll<HTMLElement>('.story-note');
    if (!cards) return;
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
  }, []);

  const goToSlide = (cardIndex: number, slideIndex: number) => {
    setActiveSlides((prev) => ({ ...prev, [cardIndex]: slideIndex }));
  };

  const shiftSlide = (cardIndex: number, direction: number, total: number) => {
    const current = activeSlides[cardIndex] ?? 0;
    const next = (current + direction + total) % total;
    setActiveSlides((prev) => ({ ...prev, [cardIndex]: next }));
  };

  return (
    <section className="histoire-section">
      <div className="histoire-header">
        <div className="section-label">L'Artiste &amp; L'Histoire</div>
        <div className="histoire-heading-row">
          <div>
            <div className="histoire-count">11</div>
            <h2 className="histoire-title"><span className="red">MOMENTS</span> CLES</h2>
            
          </div>
          <div className="histoire-tag">Une lecture plus intime du parcours de Vano Baby, racontee comme des notes de studio, des souvenirs de scene et des signes annonciateurs du grand rendez-vous.</div>
        </div>
      </div>

      <div className="story-shell">
        <div className="story-board" ref={boardRef}>
          {steps.slice(0, 8).map((step, idx) => (
            <article className={`story-note ${step.cssClass}`} key={step.year} data-idx={idx}>
              <div className="story-tape" aria-hidden="true" />
              <div className="story-card">
                {(() => {
                  const currentSlide = activeSlides[idx] ?? 0;

                  return (
                    <div className={`story-quote ${step.accent}`}>
                      <div className="story-carousel">
                        <div
                          className="story-carousel-track"
                          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
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

                      <div className="story-carousel-dots" aria-label={`Navigation ${step.title}`}>
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
                  );
                })()}

                <div className="story-meta-row">
                  <div className="story-year">{step.year}</div>
                  <div className="story-mini-tag">Archive</div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}

          <div className="story-last-row">
            {steps.slice(8).map((step, i) => {
              const idx = 8 + i;
              return (
                <article className={`story-note ${step.cssClass}`} key={step.year} data-idx={idx}>
                  <div className="story-tape" aria-hidden="true" />
                  <div className="story-card">
                    {(() => {
                      const currentSlide = activeSlides[idx] ?? 0;
                      return (
                        <div className={`story-quote ${step.accent}`}>
                          <div className="story-carousel">
                            <div className="story-carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                              {step.images.map((image, imageIndex) => (
                                <div className="story-carousel-slide" key={`${step.year}-${imageIndex}`}>
                                  <div className="story-quote-media">
                                    <Image src={image} alt={`${step.title} ${imageIndex + 1}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 240px" />
                                  </div>
                                </div>
                              ))}
                            </div>
                            <button type="button" className="story-carousel-nav prev" onClick={() => shiftSlide(idx, -1, step.images.length)} aria-label={`Image precedente ${step.title}`}>‹</button>
                            <button type="button" className="story-carousel-nav next" onClick={() => shiftSlide(idx, 1, step.images.length)} aria-label={`Image suivante ${step.title}`}>›</button>
                          </div>
                          <div className="story-carousel-dots">
                            {step.images.map((_, imageIndex) => (
                              <button type="button" key={`${step.year}-dot-${imageIndex}`} className={`story-carousel-dot${(activeSlides[idx] ?? 0) === imageIndex ? ' is-active' : ''}`} onClick={() => goToSlide(idx, imageIndex)} aria-label={`Aller a l'image ${imageIndex + 1}`} />
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                    <div className="story-meta-row">
                      <div className="story-year">{step.year}</div>
                      <div className="story-mini-tag">Archive</div>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="histoire-cta">
        <a href="#billetterie" className="btn-main" onClick={(e) => { e.preventDefault(); document.getElementById('billetterie')?.scrollIntoView({ behavior: 'smooth' }); }}>
          Prendre mon ticket
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
