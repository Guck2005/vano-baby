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
  const [qty, setQty] = useState<Record<string, number>>({ standard: 0, premium: 0, vip: 0, vvip: 0 });
  const [remaining, setRemaining] = useState<Record<string, number>>(
    Object.fromEntries(tickets.map((t) => [t.id, t.remaining]))
  );
  const [bookingOpen, setBookingOpen] = useState(false);

  const active = tickets.find((t) => t.id === selected)!;
  const activeQty = qty[selected] ?? 0;
  const cartItems = tickets
    .map((ticket) => ({ ticket, qty: qty[ticket.id] ?? 0 }))
    .filter((item) => item.qty > 0);
  const cartQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const total = cartItems.reduce((sum, item) => sum + item.ticket.price * item.qty, 0);
  const cartCategoryLabel = cartItems.length === 1 ? cartItems[0].ticket.label : `${cartItems.length} categories`;

  const setQtyFor = (id: string, delta: number) => {
    setQty((prev) => {
      const next = Math.min(Math.max(0, (prev[id] ?? 0) + delta), remaining[id]);
      return { ...prev, [id]: next };
    });
  };

  const handleSuccess = (orders: Array<{ id: string; qty: number }>) => {
    setRemaining((prev) => {
      const next = { ...prev };
      for (const order of orders) {
        next[order.id] = Math.max(0, (next[order.id] ?? 0) - order.qty);
      }
      return next;
    });
    setQty({ standard: 0, premium: 0, vip: 0, vvip: 0 });
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
              const cardQty = qty[t.id] ?? 0;

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
                      <button
                        className="billet-card-cta"
                        onClick={() => setBookingOpen(true)}
                        disabled={cartQty === 0}
                      >
                        {cartQty === 0
                          ? 'Commander un ticket'
                          : cartQty === 1
                            ? 'Commander mon ticket'
                            : `Commander mes ${cartQty} tickets`}
                      </button>
                    </div>
                  </div>

                  <div className="billet-price-block">
                    <div className="billet-price">
                      {fmt(t.price)}<span className="billet-currency"> FCFA</span>
                    </div>

                    <div className="billet-qty is-visible" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="billet-qty-btn"
                        onClick={() => setQtyFor(t.id, -1)}
                        disabled={(qty[t.id] ?? 0) <= 0}
                      >−</button>
                      <span className="billet-qty-num">{cardQty}</span>
                      <button
                        className="billet-qty-btn"
                        onClick={() => setQtyFor(t.id, +1)}
                        disabled={qty[t.id] >= rem}
                      >+</button>
                    </div>
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
              <span>Catégorie active</span>
              <strong>{active.label}</strong>
            </div>
            <div className="billet-recap-row">
              <span>Prix catégorie active</span>
              <strong>{fmt(active.price)} FCFA</strong>
            </div>
            <div className="billet-recap-row">
              <span>Panier</span>
              <strong>{cartQty > 0 ? `${cartCategoryLabel} · ${cartQty} ticket${cartQty > 1 ? 's' : ''}` : 'Vide'}</strong>
            </div>
            <div className="billet-recap-row">
              <span>Quantité active</span>
              <div className="billet-qty is-visible" style={{ justifyContent: 'flex-end' }}>
                <button className="billet-qty-btn" onClick={() => setQtyFor(selected, -1)} disabled={activeQty <= 0}>−</button>
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
              onClick={() => setBookingOpen(true)}
              disabled={cartQty === 0}
            >
              {cartQty === 0
                ? 'Commander un ticket'
                : cartQty === 1
                  ? 'Commander mon ticket'
                  : `Commander mes ${cartQty} tickets`}
            </button>

            <p className="billet-recap-note">
              Paiement sécurisé · Wave / MTN MoMo
            </p>
          </div>

        </div>
      </div>
      {bookingOpen && cartQty > 0 && (
        <BookingModal
          items={cartItems}
          accentColor={active.color}
          onClose={() => setBookingOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </section>
  );
}
