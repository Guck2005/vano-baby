'use client';

import Image from 'next/image';

const scrollToBilletterie = (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById('billetterie')?.scrollIntoView({ behavior: 'smooth' });
};

export default function Acces() {
  return (
    <section className="acces-section" id="acces">
      <div className="acces-shell">

        <div className="section-label acces-label">Accès &amp; Infos pratiques</div>

        <div className="acces-frame">
          {/* Colonne gauche — infos */}
          <div className="acces-left">
            <h2 className="acces-title">
              Majestic de <span className="acces-red">Wologuèdè</span> — Cotonou
            </h2>

            <p className="acces-body">
              Tout est prévu pour que tu arrives, entres et profites. Voici tout ce qu&apos;il faut savoir avant le 04 avril.
            </p>

            <ul className="acces-bullets">
              <li>
                <span className="acces-icon-box" aria-hidden="true">📍</span>
                <span>Majestic de Wologuèdè, Cotonou</span>
              </li>
              <li>
                <span className="acces-icon-box" aria-hidden="true">🕓</span>
                <span>Ouverture des portes à 16h</span>
              </li>
              <li>
                <span className="acces-icon-box" aria-hidden="true">🚗</span>
                <span>Taxi / Zem / Parking disponible sur place</span>
              </li>
              <li>
                <span className="acces-icon-box" aria-hidden="true">🎟️</span>
                <span>QR code à présenter à l&apos;entrée</span>
              </li>
              <li>
                <span className="acces-icon-box" aria-hidden="true">📱</span>
                <span>Mobile Money accepté (Wave / MTN MoMo)</span>
              </li>
            </ul>

            <a href="#billetterie" className="btn-main" style={{ marginTop: '0', alignSelf: 'flex-start' }} onClick={scrollToBilletterie}>
              Prendre mon ticket
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5H12M8.5 4L12 7.5L8.5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Colonne droite — image artiste */}
          <div className="acces-right">
            <div className="acces-img-wrap">
              <Image
                src="/img/acces_vano.png"
                alt="Vano Baby"
                width={520}
                height={740}
                className="acces-img"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
