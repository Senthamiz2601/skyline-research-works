import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaInstagram,
  FaArrowUp,
} from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">

      <div className="container footer__grid">

        {/* Brand */}
        <div className="footer__brand">
          <h4 style={{ color: '#f3f1f1' }}>Skyline Research Works</h4>

          <p className="footer__description" style={{ textAlign: 'justify' }}>
            Got an idea? Let's turn it into something real.
            From research and projects to publications and technology,
            we're here to help you move forward.
          </p>

        </div>


        {/* Explore */}
        <div className="footer__column">
          <h5>Explore</h5>

          <ul>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/knowledge-hub">Knowledge Hub</Link>
            </li>
            <li>
              <Link to="/internships">Internships</Link>
            </li>
          </ul>
        </div>


        {/* Company */}
        <div className="footer__column">
          <h5>Company</h5>

          <ul>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/publications">Publications</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>


        {/* Contact */}
        <div className="footer__column footer__contact">
          <h5>Let's Connect</h5>

          <ul>

            <li>
              <FaEnvelope className="footer__icon" />
              <a href="mailto:skylineresearch.works@gmail.com">
                skylineresearch.works@gmail.com
              </a>
            </li>

            <li>
              <FaWhatsapp className="footer__icon" />
              <a href="https://wa.me/919360934641" target="_blank" rel="noreferrer">
                +91 93609 34641
              </a>
            </li>

            <li>
              <FaInstagram className="footer__icon" />
              <a
                href="https://www.instagram.com/skylinereasearchworks/"
                target="_blank"
                rel="noreferrer"
              >
                @skylinereasearchworks
              </a>
            </li>

            <li>
              <FaMapMarkerAlt className="footer__icon" />
              <span>Trichy - 620002</span>
            </li>

          </ul>
        </div>

      </div>


      {/* Bottom Bar */}
      <div className="container footer__bottom">

        <p>
          © {new Date().getFullYear()} Skyline Research Works.
          All rights reserved.
        </p>

        <div className="footer__bottom-right">

          <Link
            to="/admin/login"
            className="footer__admin-link"
          >
            Admin
          </Link>

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
          >
            <FaArrowUp />
          </button>

        </div>

      </div>

    </footer>
  );
}