
import React from 'react';
import {
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaArrowUp,
} from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">

        {/* Brand */}
        <div className="footer__brand">
          <h4>Skyline Research Works</h4>

          <p className="footer__description">
            Got an idea? Let's turn it into something real.
            From research and projects to publications and technology,
            we're here to help you move forward.
          </p>
        </div>

        {/* Connect */}
        <div className="footer__contact">
          <h5>Let's Connect</h5>

          <div className="footer__socials">
            <a
              href="mailto:skylineresearch.works@gmail.com"
              aria-label="Email Skyline Research Works"
              title="Email"
            >
              <FaEnvelope />
            </a>

            <a
              href="https://www.instagram.com/skylinereasearchworks/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/YOUR_FACEBOOK_PAGE"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://wa.me/919360934641"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://www.linkedin.com/company/skyline-research-works/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>

          <div className="footer__location">
            <FaMapMarkerAlt />
            <span>Trichy - 620002</span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} Skyline Research Works.
          All rights reserved.
        </p>

        <div className="footer__bottom-right">
          <button
            type="button"
            className="footer__top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            aria-label="Back to top"
            title="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
