'use client';

import { useState, useEffect } from 'react';

interface TicketInfo {
  id: string;
  label: string;
  price: number;
  color: string;
  colorDark: string;
}

interface Props {
  ticket: TicketInfo;
  qty: number;
  onClose: () => void;
  onSuccess: (id: string, qty: number) => void;
}

function fmt(n: number) {
  return n.toLocaleString('fr-FR').replace(/\u202f/g, ' ');
}

type Step = 'form' | 'loading' | 'success';

export default function BookingModal({ ticket, qty, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<Step>('form');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [operator, setOperator] = useState<'mtn' | 'moov' | ''>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = ticket.price * qty;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step === 'form') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, step]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!nom.trim() || nom.trim().length < 2) errs.nom = 'Nom requis (min. 2 caractères)';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Email invalide';
    if (!operator) errs.operator = 'Sélectionnez un opérateur';
    if (!phone.trim() || !/^\d{10}$/.test(phone)) errs.phone = '10 chiffres requis';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStep('loading');
    setTimeout(() => setStep('success'), 2500);
  };

  return (
    <div
      className="booking-overlay"
      onClick={step === 'form' ? onClose : undefined}
    >
      <div
        className="booking-modal"
        style={{ '--billet-color': ticket.color, '--billet-dark': ticket.colorDark } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        {step !== 'loading' && (
          <button className="booking-close" onClick={onClose} aria-label="Fermer">✕</button>
        )}

        {/* FORMULAIRE */}
        {step === 'form' && (
          <>
            <div className="booking-title">Réserver votre place</div>

            <div className="booking-recap">
              <div className="booking-recap-left">
                <div className="booking-recap-cat">{ticket.label}</div>
                <div className="booking-recap-qty">{qty} place{qty > 1 ? 's' : ''}</div>
              </div>
              <div className="booking-recap-total">
                {fmt(total)} <span>FCFA</span>
              </div>
            </div>

            <form className="booking-form" onSubmit={handleSubmit} noValidate>

              <div className="booking-field">
                <label className="booking-label">Nom complet</label>
                <input
                  type="text"
                  className={`booking-input${errors.nom ? ' has-error' : ''}`}
                  placeholder="Jean Dupont"
                  value={nom}
                  onChange={(e) => { setNom(e.target.value); setErrors((p) => ({ ...p, nom: '' })); }}
                />
                {errors.nom && <span className="booking-error">{errors.nom}</span>}
              </div>

              <div className="booking-field">
                <label className="booking-label">Email</label>
                <input
                  type="email"
                  className={`booking-input${errors.email ? ' has-error' : ''}`}
                  placeholder="jean@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
                />
                {errors.email && <span className="booking-error">{errors.email}</span>}
              </div>

              <div className="booking-field">
                <label className="booking-label">Numéro Mobile Money</label>

                <div className="booking-operators">
                  <button
                    type="button"
                    className={`booking-op${operator === 'mtn' ? ' is-active' : ''}`}
                    onClick={() => { setOperator('mtn'); setErrors((p) => ({ ...p, operator: '' })); }}
                  >
                    MTN MoMo
                  </button>
                  <button
                    type="button"
                    className={`booking-op${operator === 'moov' ? ' is-active' : ''}`}
                    onClick={() => { setOperator('moov'); setErrors((p) => ({ ...p, operator: '' })); }}
                  >
                    Moov Money
                  </button>
                </div>
                {errors.operator && <span className="booking-error">{errors.operator}</span>}

                <div className={`booking-phone-wrap${errors.phone ? ' has-error' : ''}`}>
                  <span className="booking-prefix">+229</span>
                  <input
                    type="tel"
                    className="booking-phone-input"
                    placeholder="0000000000"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhone(val);
                      setErrors((p) => ({ ...p, phone: '' }));
                    }}
                  />
                </div>
                {errors.phone && <span className="booking-error">{errors.phone}</span>}
              </div>

              <button type="submit" className="booking-submit">
                Payer {fmt(total)} FCFA
              </button>

            </form>
          </>
        )}

        {/* CHARGEMENT */}
        {step === 'loading' && (
          <div className="booking-loading">
            <div className="booking-spinner" style={{ borderTopColor: ticket.color }} />
            <p className="booking-loading-text">Traitement en cours…</p>
          </div>
        )}

        {/* SUCCÈS */}
        {step === 'success' && (
          <div className="booking-success">
            <div className="booking-success-icon" style={{ background: ticket.color }}>✓</div>
            <h3 className="booking-success-title">Place enregistrée !</h3>
            <p className="booking-success-msg">
              Votre place a été bien enregistrée. Consultez votre mail pour recevoir votre ticket et votre QR code d&apos;entrée.
            </p>
            <button className="booking-submit" onClick={() => { onSuccess(ticket.id, qty); onClose(); }}>Fermer</button>
          </div>
        )}

      </div>
    </div>
  );
}
