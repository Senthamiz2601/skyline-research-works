import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceCard.css';

// 1:1 with Figma "Service Card": icon, heading, blue tagline, description, link.
export default function ServiceCard({ service }) {
  const { title, tagline, description, slug, icon } = service;
  return (
    <div className="service-card">
      {icon ? <img src={icon} alt="" className="service-card__icon" /> : <div className="service-card__icon service-card__icon--placeholder" aria-hidden="true" />}
      <h3>{title}</h3>
      {tagline && <p className="service-card__tagline">{tagline}</p>}
      <p className="service-card__desc">{description}</p>
      <Link to={`/services/${slug}`} className="service-card__link">
        Explore {title} →
      </Link>
    </div>
  );
}
