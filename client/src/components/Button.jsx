import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

// Matches Figma "Button" component: primary (filled blue) and secondary (tinted outline) variants.
export default function Button({ children, variant = 'primary', to, href, onClick, type = 'button', disabled }) {
  const className = `btn btn--${variant}`;
  if (to) return <Link to={to} className={className}>{children}</Link>;
  if (href) return <a href={href} className={className}>{children}</a>;
  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
