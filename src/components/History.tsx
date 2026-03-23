'use client';

import { useState } from 'react';
import Image from 'next/image';

const steps = [
  { year: '2016', title: 'Le gang prend vie', text: 'Les premieres apparitions installent une voix, une attitude et une energie qui commencent deja a marquer la scene.', images: ['/img/background_hero.png', '/img/hero_image.png', '/img/guest/fanicko.jpg'], cssClass: 'note-1', accent: 'accent-red' },
  { year: '2017', title: 'Premieres scenes', text: 'Le public decouvre une presence forte sur scene, avec un style direct et des performances qui accrochent.', images: ['/img/hero_image.png', '/img/background_hero.png', '/img/guest/fanicko.jpg'], cssClass: 'note-2', accent: 'accent-ember' },
  { year: '2018', title: 'Les titres s imposent', text: 'Les morceaux circulent, la base de fans grossit et l identite artistique commence a devenir incontournable.', images: ['/img/guest/fanicko.jpg', '/img/hero_image.png', '/img/background_hero.png'], cssClass: 'note-3', accent: 'accent-bone' },
  { year: '2019', title: 'Le rayonnement s elargit', text: 'Les collaborations, les passages remarques et la notoriete installent Vano Baby dans une autre dimension.', images: ['/img/background_hero.png', '/img/guest/fanicko.jpg', '/img/hero_image.png'], cssClass: 'note-4', accent: 'accent-red' },
  { year: '2020', title: 'L identite s affirme', text: 'Le style, l attitude et le ton deviennent plus reconnaissables, avec une image qui marque davantage les esprits.', images: ['/img/hero_image.png', '/img/background_hero.png', '/img/guest/fanicko.jpg'], cssClass: 'note-5', accent: 'accent-ember' },
  { year: '2021', title: 'Un nouveau souffle', text: 'Le son evolue, les visuels se renforcent et chaque sortie affirme un univers plus ambitieux et plus mature.', images: ['/img/hero_image.png', '/img/background_hero.png', '/img/guest/fanicko.jpg'], cssClass: 'note-6', accent: 'accent-bone' },
  { year: '2022', title: 'La reconnaissance', text: 'Le parcours prend une autre ampleur et les moments forts s enchainent avec une vraie reconnaissance populaire.', images: ['/img/guest/fanicko.jpg', '/img/background_hero.png', '/img/hero_image.png'], cssClass: 'note-7', accent: 'accent-red' },
  { year: '2023', title: 'La scene grandit', text: 'Les performances deviennent plus fortes, plus attendues et plus memorables a chaque passage.', images: ['/img/background_hero.png', '/img/hero_image.png', '/img/guest/fanicko.jpg'], cssClass: 'note-8', accent: 'accent-ember' },
  { year: '2025', title: 'L annee decisive', text: 'Tout converge vers une celebration a grande echelle, pensee comme un moment fort pour les fans et le parcours.', images: ['/img/hero_image.png', '/img/guest/fanicko.jpg', '/img/background_hero.png'], cssClass: 'note-9', accent: 'accent-bone' },
  { year: '2026', title: 'Le grand soir', text: 'Le 04 avril 2026 devient le point culminant de cette decennie: un concert manifeste pour celebrer 10 ans du gang.', images: ['/img/hero_image.png', '/img/background_hero.png', '/img/guest/fanicko.jpg'], cssClass: 'note-10 is-current', accent: 'accent-gold' }
];

export default function History() {
  const [activeSlides, setActiveSlides] = useState<Record<number, number>>({});

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
            <div className="histoire-count">10</div>
            <h2 className="histoire-title"><span className="red">MOMENTS</span> CLES</h2>
            
          </div>
          <div className="histoire-tag">Une lecture plus intime du parcours de Vano Baby, racontee comme des notes de studio, des souvenirs de scene et des signes annonciateurs du grand rendez-vous.</div>
        </div>
      </div>

      <div className="story-shell">
        <div className="story-board">
          {steps.map((step, idx) => (
            <article className={`story-note ${step.cssClass}`} key={idx}>
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
        </div>
      </div>
    </section>
  );
}
