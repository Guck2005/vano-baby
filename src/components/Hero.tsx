import Image from 'next/image';
import Navbar from './Navbar';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <Image
          src="/img/background_hero.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
      </div>

      <div className="layer-artist" />
      <div className="layer-gradient" />
      <div className="layer-bottom-fade" />
     
      <Navbar />

      <div className="hero-content">
        {/* <div className="hero-badge">Concert Live - Edition Anniversaire</div> */}

        <p className="hero-celebration">Célébration des</p>

        <h1 className="hero-title">
          {/* 10 ANS — lettres individuelles, rouge */}
          <span className="title-word">
            {'10ANS'.split('').map((char, i) =>
              char === ' ' ? (
                <span key={i} className="title-word-space" />
              ) : (
                <span key={i} className="letter-wrap">
                  <span className="letter red" style={{ animationDelay: `${i * 65}ms` }}>
                    {char}
                  </span>
                </span>
              )
            )}
          </span>

          <span className="hero-title-line">
            {/* DU — lettres individuelles, solide */}
            <span className="title-word">
              {'DU'.split('').map((char, i) => (
                <span key={i} className="letter-wrap">
                  <span className="letter solid" style={{ animationDelay: `${(6 + i) * 65}ms` }}>
                    {char}
                  </span>
                </span>
              ))}
            </span>

            <span className="letter-wrap">
              <span className="letter red" style={{ animationDelay: '520ms' }}>GANG</span>
            </span>
          </span>
        </h1>

        {/* <p className="hero-sub">
          <span>Vano Baby</span> - La nuit qui change tout
        </p> */}
      </div>

      <div className="hero-row">
        <div className="hero-ctas">
          <a
            href="#billetterie"
            className="btn-main"
          >
            Prendre mon ticket
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M3 7.5H12M8.5 4L12 7.5L8.5 11"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          {/* <a href="#" className="btn-sec">
            Decouvrir l'histoire
          </a> */}
        </div>

        {/* <div className="countdown-block">
          <div className="cd-label">Compte a rebours</div>
          <div className="countdown">
            <div className="cd-unit">
              <div className="cd-num">{timeLeft.d}</div>
              <div className="cd-lbl">Jours</div>
            </div>
            <div className="cd-sep">:</div>
            <div className="cd-unit">
              <div className="cd-num">{timeLeft.h}</div>
              <div className="cd-lbl">Heures</div>
            </div>
            <div className="cd-sep">:</div>
            <div className="cd-unit">
              <div className="cd-num">{timeLeft.m}</div>
              <div className="cd-lbl">Min</div>
            </div>
            <div className="cd-sep">:</div>
            <div className="cd-unit">
              <div className="cd-num">{timeLeft.s}</div>
              <div className="cd-lbl">Sec</div>
            </div>
          </div>
        </div> */}
      </div>

      {/* ── Floating info cards ── */}
      <div className="hero-card hero-card--1" aria-hidden="true">
        <span className="hcard-label">Type</span>
        <span className="hcard-value">Concert Live</span>
        <span className="hcard-accent" />
      </div>

      <div className="hero-card hero-card--2" aria-hidden="true">
        <span className="hcard-label">Date</span>
        <span className="hcard-value ">04 Avril 2026</span>
        <span className="hcard-accent" />
      </div>

      <div className="hero-card hero-card--3" aria-hidden="true">
        <span className="hcard-label">Lieu</span>
        <span className="hcard-value">Majestic de Wologuèdè</span>
        <span className="hcard-accent" />
      </div>

      <div className="hero-card hero-card--5" aria-hidden="true">
        <span className="hcard-label">Tickets</span>
        <span className="hcard-value">À partir de 5000 FCFA</span>
        <span className="hcard-accent" />
        {/* <span className="hcard-price">5 000 <span className="hcard-currency">FCFA</span></span> */}
      </div>

      <div className="hero-visual">
        <Image
          src="/img/hero_image.png"
          alt="Vano Baby au premier plan"
          fill
          sizes="100vw"
          style={{ objectFit: 'contain', objectPosition: 'center center' }}
          priority
          fetchPriority="high"
        />
      </div>

    </section>
  );
}
