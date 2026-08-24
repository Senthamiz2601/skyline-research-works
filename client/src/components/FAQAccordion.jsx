import React, { useState } from 'react';
import './FAQAccordion.css';

export default function FAQAccordion({ items }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="faq-accordion">
      {items.map((item) => {
        const isOpen = openId === item._id;
        return (
          <div key={item._id} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
            <button
              className="faq-item__question"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item._id)}
            >
              {item.question}
              <span className="faq-item__icon">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className="faq-item__answer">{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
