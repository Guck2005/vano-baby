const stripItems = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  text: '10 ANS DU GANG',
}));

export default function HypeStrip() {
  return (
    <section className="hype-strip-section" aria-label="Bande annonce evenement">
      <div className="hype-strip-shell">
        <div className="hype-strip hype-strip-top">
          <div className="hype-strip-track">
            {stripItems.map((item) => (
              <span className="hype-strip-item" key={`top-${item.id}`}>
                {item.text}
              </span>
            ))}
            {stripItems.map((item) => (
              <span className="hype-strip-item" key={`top-dup-${item.id}`}>
                {item.text}
              </span>
            ))}
          </div>
        </div>

        <div className="hype-strip hype-strip-bottom">
          <div className="hype-strip-track reverse">
            {stripItems.map((item) => (
              <span className="hype-strip-item" key={`bottom-${item.id}`}>
                VANO BABY
              </span>
            ))}
            {stripItems.map((item) => (
              <span className="hype-strip-item" key={`bottom-dup-${item.id}`}>
                VANO BABY
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
