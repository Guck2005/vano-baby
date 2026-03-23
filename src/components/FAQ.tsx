'use client';

import { useState } from 'react';
import Image from 'next/image';

const faqItems = [
  {
    question: 'Comment acheter mes billets pour le concert du 04 avril 2026 ?',
    answer:
      "La reservation se fait en ligne via la billetterie du site. Choisis ton offre, valide tes informations, puis conserve ta confirmation pour l'acces le jour de l'evenement.",
  },
  {
    question: "A quelle heure faut-il arriver sur place ?",
    answer:
      "Nous conseillons d'arriver en avance pour faciliter l'acces, profiter de l'ambiance et t'installer sereinement avant le debut du show. Les horaires detailes seront rappeles avec les informations pratiques.",
  },
  {
    question: "Le billet est-il nominatif ou transferable ?",
    answer:
      "Selon la formule choisie, certaines reservations peuvent etre controlees a l'entree. Garde bien ton justificatif et verifie les conditions indiquees lors de l'achat pour eviter toute mauvaise surprise.",
  },
  {
    question: "Y aura-t-il des invites et des surprises pendant la soiree ?",
    answer:
      "Oui. L'evenement est pense comme une grande celebration des 10 ans du gang, avec des apparitions, des moments exclusifs et une mise en scene speciale autour de Vano Baby.",
  },
  {
    question: "Que se passe-t-il si je ne peux plus venir ?",
    answer:
      "Si un empechement survient, refere-toi aux conditions de la billetterie associees a ton achat. Nous recommandons de verifier ces informations au moment de la commande pour connaitre les modalites exactes.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-shell">
        <div className="faq-content">
          <div className="faq-heading">
            <div className="faq-kicker">Foire aux questions</div>
            <h2 className="faq-title">
              Tout savoir avant <span>le 04 avril</span>
            </h2>
          </div>

          <div className="faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      <Image
                        src="/img/eye.gif"
                        alt=""
                        width={26}
                        height={26}
                        className="faq-eye"
                        unoptimized
                      />
                    </span>
                  </button>

                  <div className="faq-answer-wrap" hidden={!isOpen}>
                    <div className="faq-answer">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
