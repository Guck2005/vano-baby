import Image from 'next/image';

export default function Acces() {
  return (
    <section className="acces-section" id="acces">
      <div className="acces-shell">

        <div className="section-label acces-label">Acc&egrave;s &amp; Infos pratiques</div>

        <div className="acces-frame">
          <div className="acces-left">
            <h2 className="acces-title">
              <span className="acces-red">Le Gang</span>, ce message est <span className="acces-red">pour vous !</span>
            </h2>

            <p className="acces-body">
              Le 04 avril au Majestic de Wologu&egrave;d&egrave; (ex Canal Olympia Wologu&egrave;d&egrave;), nous c&eacute;l&eacute;brerons ensemble nos 10 ans de carri&egrave;re. C&apos;est notre soir&eacute;e. Pas juste la mienne.
            </p>

            <ul className="acces-bullets">
              <li>
                <span className="acces-icon-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 9V7a2 2 0 0 1 2-2h12v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 9V7a2 2 0 0 0-2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 12h16v5a2 2 0 0 1-2 2h-2l-2-2h-4l-2 2H6a2 2 0 0 1-2-2v-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="8.5" cy="14.5" r="0.7" fill="currentColor" />
                  </svg>
                </span>
                <span>Prenez vos tickets avant la rupture des stocks.</span>
              </li>
              <li>
                <span className="acces-icon-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>Venez tr&egrave;s t&ocirc;t pour profiter du show et des surprises que j&apos;ai personnellement r&eacute;serv&eacute;es pour vous (les portes ouvrent &agrave; 16h).</span>
              </li>
              <li>
                <span className="acces-icon-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span>Venez l&eacute;gers pour bien vous enjaillez et n&apos;amenez surtout pas d&apos;objets tranchants ou coupants.</span>
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
                src="/img/acces_vano3.png"
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
