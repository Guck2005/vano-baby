'use client';

import { useState } from 'react';
import Image from 'next/image';

const faqItems = [
  {
    question: 'On prend nos tickets où ?',
    answer:
      "Directement ici sur notre site. Vous choisissez votre catégorie, vous sélectionnez vos places et vous validez. Ne perdez pas vos tickets car c'est ça qui vous donnera accès au Majestic le 04 avril.",
  },
  {
    question: "On arrive à quelle heure ?",
    answer:
      "Les portes du Majestic s'ouvreront à 16h. Venez tôt. Vraiment. J'ai préparé des surprises pour les premiers qui seront là.",
  },
  {
    question: "On peut donner notre ticket à quelqu'un d'autre ?",
    answer:
      "Selon votre catégorie, votre billet peut être vérifié à l'entrée. Vérifiez les conditions au moment de votre achat. Et si vous pouvez venir, venez. Cette soirée ne se reproduira jamais.",
  },
  {
    question: "Il y aura des guests ? Des surprises ?",
    answer:
      "Oui!!! Regardez plus haut sur le site. Les noms confirmés sont là. Mais comme toujours, je garde les meilleures surprises pour le soir même.",
  },
  {
    question: "On peut payer sur place ?",
    answer:
      "Oui. Mais ne prenez pas le risque d'attendre parce que les places partent vite. Réservez maintenant pendant qu'il en reste.",
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
                        loading="lazy"
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
