import React, { useState } from "react";
import "../../assets/css/faq.css"; // Assurez-vous d'avoir ce fichier CSS pour le style

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "Qu'est-ce que React?",
      answer:
        "React est une bibliothèque JavaScript pour construire des interfaces utilisateur. Elle permet de créer des composants réutilisables et de gérer efficacement l'état de l'application.",
    },
    {
      question: "Comment installer React?",
      answer:
        "Vous pouvez installer React en utilisant la commande 'npx create-react-app mon-app' ou en l'ajoutant via CDN dans votre projet existant.",
    },
    {
      question: "Qu'est-ce qu'un composant?",
      answer:
        "Un composant est une partie indépendante et réutilisable de l'interface qui retourne du JSX à afficher. Il peut être de type classe ou fonction.",
    },
    {
      question: "Qu'est-ce que l'état en React?",
      answer:
        "L'état (state) est un objet qui contient des données qui peuvent changer au cours du temps et qui influencent le rendu du composant.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-accordion">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span className="faq-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
            </button>
            <div className="faq-answer">{item.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
