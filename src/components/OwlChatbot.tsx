'use client';

import { useMemo, useState } from 'react';

const WHATSAPP_NUMBER = '2290168845592';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%20je%20souhaite%20avoir%20plus%20d%27informations%20sur%20l%27evenement%20Vano%20Baby`;

const baseQuestions = [
  {
    label: 'Billets',
    answer:
      "Les billets sont accessibles depuis le site. Choisis ton offre puis suis le parcours de reservation jusqu'a la confirmation.",
  },
  {
    label: 'Lieu',
    answer:
      "Les informations pratiques autour du lieu et de l'acces seront communiquees clairement sur le site et dans les messages de confirmation.",
  },
  {
    label: 'Horaire',
    answer:
      "Nous te conseillons d'arriver un peu en avance pour profiter de l'ambiance et entrer sereinement avant le debut du show.",
  },
  {
    label: 'Autre question',
    answer: `Pour toute autre question, contacte-nous directement sur WhatsApp au ${WHATSAPP_NUMBER}.`,
    isWhatsapp: true,
  },
];

export default function OwlChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(baseQuestions[0]);

  const currentAnswer = useMemo(() => selectedQuestion, [selectedQuestion]);

  return (
    <div className={`owl-chatbot${isOpen ? ' is-open' : ''}`}>
      <div className="owl-chatbot-panel">
        <div className="owl-chatbot-header">
          <div>
            <div className="owl-chatbot-kicker">Assistant</div>
            <h3>Le Hibou</h3>
          </div>
          <button
            type="button"
            className="owl-chatbot-close"
            onClick={() => setIsOpen(false)}
            aria-label="Fermer le chatbot"
          >
            ×
          </button>
        </div>

        <p className="owl-chatbot-intro">Choisis une question rapide pour obtenir une reponse immediate.</p>

        <div className="owl-chatbot-questions">
          {baseQuestions.map((question) => (
            <button
              key={question.label}
              type="button"
              className={`owl-chatbot-chip${selectedQuestion.label === question.label ? ' is-active' : ''}`}
              onClick={() => setSelectedQuestion(question)}
            >
              {question.label}
            </button>
          ))}
        </div>

        <div className="owl-chatbot-answer">
          <p>{currentAnswer.answer}</p>
          {currentAnswer.isWhatsapp ? (
            <a href={WHATSAPP_URL} className="owl-chatbot-whatsapp">
              Contacter WhatsApp : +229 01 68 84 55 92
            </a>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        className="owl-chatbot-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Ouvrir le chatbot"
      >
        <span className="owl-chatbot-trigger-icon" aria-hidden="true">
          🦉
        </span>
        <span className="owl-chatbot-trigger-text">Besoin d&apos;aide ?</span>
      </button>
    </div>
  );
}
