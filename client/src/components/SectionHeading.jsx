import React from 'react';
import './SectionHeading.css';

// Matches Figma "Heading 2" pattern: centered title + centered muted subtitle.
export default function SectionHeading({ title, subtitle, align = 'center' }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
