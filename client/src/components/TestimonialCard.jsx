import React from 'react';
import './TestimonialCard.css';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-card__rating" aria-label={`${testimonial.rating} out of 5 stars`}>
        {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
      </div>
      <p className="testimonial-card__feedback">&ldquo;{testimonial.feedback}&rdquo;</p>
      <div className="testimonial-card__person">
        {testimonial.image ? <img src={testimonial.image} alt={testimonial.name} /> : <div className="testimonial-card__avatar">{testimonial.name?.[0]}</div>}
        <div>
          <p className="testimonial-card__name">{testimonial.name}</p>
          <p className="testimonial-card__role">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
