import Image from 'next/image';

export default function Acces() {
  return (
    <section className="acces-section" id="acces">
      <div className="acces-shell">

        <div className="section-label acces-label">Acc&egrave;s &amp; Infos pratiques</div>

        <div className="acces-frame">
          <div className="acces-left">
            <h2 className="acces-title">
              Majestic de <span className="acces-red">Wologu&egrave;d&egrave;</span> — Cotonou
            </h2>

            <p className="acces-body">
              Tout est pr&eacute;vu pour que tu arrives, entres et profites. Voici tout ce qu&apos;il faut savoir avant le 04 avril.
            </p>

            <ul className="acces-bullets">
              <li>
                <span className="acces-icon-box" aria-hidden="true">📍</span>
                <span>Majestic de Wologu&egrave;d&egrave;, Cotonou</span>
              </li>
              <li>
                <span className="acces-icon-box" aria-hidden="true">🕓</span>
                <span>Ouverture des portes &agrave; 16h</span>
              </li>
              <li>
                <span className="acces-icon-box" aria-hidden="true">🚗</span>
                <span>Taxi / Zem / Parking disponible sur place</span>
              </li>
              <li>
                <span className="acces-icon-box" aria-hidden="true">🎟️</span>
                <span>QR code &agrave; pr&eacute;senter &agrave; l&apos;entr&eacute;e</span>
              </li>
              <li>
                <span className="acces-icon-box" aria-hidden="true">📱</span>
                <span>Mobile Money accept&eacute; (Wave / MTN MoMo)</span>
              </li>
            </ul>

            <a href="#billetterie" className="btn-main" style={{ marginTop: '0', alignSelf: 'flex-start' }}>
              Prendre mon ticket
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5H12M8.5 4L12 7.5L8.5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="acces-right">
            <div className="acces-img-wrap">
              <Image
                src="/img/acces_vano1.png"
                alt="Vano Baby"
                width={520}
                height={740}
                className="acces-img acces-img--desktop"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 520px"
              />
              <Image
                src="/img/acces_vano2.png"
                alt="Vano Baby"
                width={520}
                height={740}
                className="acces-img acces-img--mobile"
                loading="lazy"
                sizes="100vw"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
