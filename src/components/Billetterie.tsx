'use client';

import { useState } from 'react';
import BookingModal from './BookingModal';

const tickets = [
  {
    id: 'standard',
    label: 'Standard',
    price: 5000,
    color: '#cc1111',
    colorDark: '#8a0000',
    total: 120,
    remaining: 47,
    perks: ['Accès salle générale', 'Zone debout', 'QR code à l\'entrée'],
  },
  {
    id: 'premium',
    label: 'Premium',
    price: 15000,
    color: '#5b35a0',
    colorDark: '#3a1e72',
    total: 80,
    remaining: 23,
    perks: ['Zone premium', 'File prioritaire', 'Meilleure visibilité'],
  },
  {
    id: 'vip',
    label: 'VIP',
    price: 50000,
    color: '#1a7a6e',
    colorDark: '#0d4f46',
    total: 40,
    remaining: 12,
    perks: ['Zone VIP assise', 'Boissons offertes', 'Accès backstage partiel'],
  },
  {
    id: 'vvip',
    label: 'VVIP',
    price: 100000,
    color: '#b8860b',
    colorDark: '#7a5500',
    total: 20,
    remaining: 5,
    perks: ['Loge privée', 'Meet & Greet', 'Pack goodies exclusif'],
  },
];

function fmt(n: number) {
  return n.toLocaleString('fr-FR').replace(/\u202f/g, ' ');
}

export default function Billetterie() {
  const [selected, setSelected] = useState<string>('standard');
  const [qty, setQty] = useState<Record<string, number>>({ standard: 1, premium: 1, vip: 1, vvip: 1 });
  const [remaining, setRemaining] = useState<Record<string, number>>(
    Object.fromEntries(tickets.map((t) => [t.id, t.remaining]))
  );
  const [booking, setBooking] = useState<{ ticket: typeof tickets[0]; qty: number } | null>(null);

  const active = tickets.find((t) => t.id === selected)!;
  const activeQty = qty[selected];
  const total = active.price * activeQty;

  const setQtyFor = (id: string, delta: number) => {
    setQty((prev) => {
      const next = Math.min(Math.max(1, (prev[id] ?? 1) + delta), remaining[id]);
      return { ...prev, [id]: next };
    });
  };

  const handleSuccess = (id: string, count: number) => {
    setRemaining((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - count) }));
    // Reclamper la quantité si elle dépasse le nouveau remaining
    setQty((prev) => ({
      ...prev,
      [id]: Math.min(prev[id], Math.max(1, remaining[id] - count)),
    }));
    setBooking(null);
  };

  return (
    <section className="billet-section" id="billetterie">
      <div className="billet-shell">

        <div className="billet-header">
          <div className="section-label">Billetterie</div>
          <h2 className="billet-title">
            Choisis ton <span className="red">expérience</span>
          </h2>
          <p className="billet-sub">
            04 Avril 2026 · Majestic de Wologuèdè · Cotonou
          </p>
        </div>

        <div className="billet-layout">

          {/* Stack de tickets */}
          <div className="billet-stack">
            {tickets.map((t) => {
              const isActive = selected === t.id;
              const rem = remaining[t.id];
              const gaugeRatio = rem / t.total;
              const gaugeColor = gaugeRatio > 0.5 ? t.color : gaugeRatio > 0.2 ? '#e08c00' : '#ee0000';
              const cardQty = qty[t.id];
              const cardTotal = t.price * cardQty;

              return (
                <div
                  key={t.id}
                  className={`billet-card${isActive ? ' is-active' : ''}`}
                  style={{ '--billet-color': t.color, '--billet-dark': t.colorDark } as React.CSSProperties}
                  onClick={() => setSelected(t.id)}
                >
                  <div className="billet-stripe" />

                  <div className="billet-body">
                    <div className="billet-top">
                      <span className="billet-label">{t.label}</span>
                      <div className="billet-gauge-wrap">
                        <div
                          className="billet-gauge-bar"
                          style={{ width: `${gaugeRatio * 100}%`, background: gaugeColor }}
                        />
                      </div>
                      <span className="billet-remaining" style={{ color: gaugeColor }}>
                        {rem} place{rem > 1 ? 's' : ''} restante{rem > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="billet-perks">
                      {t.perks.map((p) => (
                        <div key={p} className="billet-perk">
                          <span className="billet-dot" />
                          {p}
                        </div>
                      ))}
                    </div>

                    {/* CTA mobile — visible uniquement sur mobile */}
                    <div className="billet-card-footer" onClick={(e) => e.stopPropagation()}>
                      <div className="billet-card-footer-divider" />
                      <button className="billet-card-cta" onClick={() => setBooking({ ticket: t, qty: cardQty })}>
                        Réserver {cardQty} place{cardQty > 1 ? 's' : ''} · {fmt(cardTotal)} FCFA
                      </button>
                    </div>
                  </div>

                  <div className="billet-price-block">
                    <div className="billet-price">
                      {fmt(t.price)}<span className="billet-currency"> FCFA</span>
                    </div>

                    {isActive && (
                      <div className="billet-qty" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="billet-qty-btn"
                          onClick={() => setQtyFor(t.id, -1)}
                          disabled={qty[t.id] <= 1}
                        >−</button>
                        <span className="billet-qty-num">{qty[t.id]}</span>
                        <button
                          className="billet-qty-btn"
                          onClick={() => setQtyFor(t.id, +1)}
                          disabled={qty[t.id] >= rem}
                        >+</button>
                      </div>
                    )}
                  </div>

                  <div className="billet-perf billet-perf--left" />
                  <div className="billet-perf billet-perf--right" />
                </div>
              );
            })}
          </div>

          {/* Récap commande */}
          <div
            className="billet-recap"
            style={{ '--billet-color': active.color, '--billet-dark': active.colorDark } as React.CSSProperties}
          >
            <div className="billet-recap-label">Récapitulatif</div>

            <div className="billet-recap-row">
              <span>Catégorie</span>
              <strong>{active.label}</strong>
            </div>
            <div className="billet-recap-row">
              <span>Prix unitaire</span>
              <strong>{fmt(active.price)} FCFA</strong>
            </div>
            <div className="billet-recap-row">
              <span>Quantité</span>
              <div className="billet-qty" style={{ justifyContent: 'flex-end' }}>
                <button className="billet-qty-btn" onClick={() => setQtyFor(selected, -1)} disabled={activeQty <= 1}>−</button>
                <span className="billet-qty-num">{activeQty}</span>
                <button className="billet-qty-btn" onClick={() => setQtyFor(selected, +1)} disabled={activeQty >= remaining[selected]}>+</button>
              </div>
            </div>

            <div className="billet-recap-divider" />

            <div className="billet-recap-total">
              <span>Total</span>
              <strong>{fmt(total)} FCFA</strong>
            </div>

            <button
              className="billet-recap-cta"
              onClick={() => setBooking({ ticket: active, qty: activeQty })}
            >
              Réserver {activeQty} place{activeQty > 1 ? 's' : ''} · {fmt(total)} FCFA
            </button>

            <p className="billet-recap-note">
              Paiement sécurisé · Wave / MTN MoMo
            </p>
          </div>

        </div>
      </div>
      {booking && (
        <BookingModal
          ticket={booking.ticket}
          qty={booking.qty}
          onClose={() => setBooking(null)}
          onSuccess={handleSuccess}
        />
      )}
    </section>
  );
}
