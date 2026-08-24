import React, { useState } from 'react';
import { enquiriesApi } from '../services/api';
import './shared.css';
import './Contact.css';

const services = [
  'Research Guidance',
  'Project Assistance',
  'Publication Support',
  'Internship',
  'Documentation Support',
  'Career / Technical Guidance',
  'Other',
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};

    if (!form.name.trim()) {
      e.name = 'Full name is required.';
    }

    if (!form.email.trim()) {
      e.email = 'Email is required.';
    } else if (!emailRegex.test(form.email)) {
      e.email = 'Enter a valid email address.';
    }

    if (!form.phone.trim()) {
      e.phone = 'Phone / WhatsApp number is required.';
    }

    if (!form.service) {
      e.service = 'Please select the service you are interested in.';
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters.';
    }

    return e;
  };

  const handleChange = (field) => (ev) => {
    setForm((current) => ({
      ...current,
      [field]: ev.target.value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (status === 'submitting') return;

    const validationErrors = validate();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');
    setServerError('');

    try {
      await enquiriesApi.create(form);

      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setServerError(
        err.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <main className="contact-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="contact-hero">
        <div className="container contact-hero__inner">

          <div className="contact-hero__content">

            <span className="contact-hero__eyebrow">
              CONTACT SKYLINE
            </span>

            <h1>
              Let&apos;s turn your
              <span> idea into impact.</span>
            </h1>

            <p>
              Have a research idea, project requirement or publication
              goal? Tell us what you are working on and our team will
              help you find the right direction.
            </p>

            <div className="contact-hero__trust">

              <div className="contact-hero__trust-item">
                <span className="contact-hero__trust-icon">✓</span>
                <div>
                  <strong>Expert Guidance</strong>
                  <small>Practical &amp; focused support</small>
                </div>
              </div>

              <div className="contact-hero__trust-item">
                <span className="contact-hero__trust-icon">↗</span>
                <div>
                  <strong>Student Friendly</strong>
                  <small>Clear communication throughout</small>
                </div>
              </div>

            </div>

          </div>

          {/* Decorative visual */}

          <div className="contact-hero__visual">

            <div className="contact-visual__grid"></div>

            <div className="contact-visual__glow contact-visual__glow--one"></div>
            <div className="contact-visual__glow contact-visual__glow--two"></div>

            <div className="contact-visual__card contact-visual__card--main">

              <div className="contact-visual__card-top">
                <span>SKYLINE</span>
                <span>01</span>
              </div>

              <div className="contact-visual__message">
                <span className="contact-visual__message-dot"></span>

                <div>
                  <small>YOUR IDEA</small>
                  <strong>Starts with a conversation.</strong>
                </div>
              </div>

              <div className="contact-visual__lines">
                <span></span>
                <span></span>
                <span></span>
              </div>

            </div>

            <div className="contact-visual__floating contact-visual__floating--top">
              <span>R</span>
              <div>
                <strong>Research</strong>
                <small>Guidance</small>
              </div>
            </div>

            <div className="contact-visual__floating contact-visual__floating--bottom">
              <span>✓</span>
              <div>
                <strong>Let&apos;s Connect</strong>
                <small>We&apos;re listening</small>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CONTACT AREA
      ===================================================== */}

      <section className="contact-section">

        <div className="container">

          <div className="contact-layout">

            {/* =================================================
                INFO
            ================================================= */}

            <aside className="contact-info">

              <span className="contact-info__eyebrow">
                START A CONVERSATION
              </span>

              <h2>
                Tell us what
                <br />
                you&apos;re working on.
              </h2>

              <p>
                Share a few details about your requirement. Whether it&apos;s
                research, a technical project, publication or career
                guidance, we&apos;ll help you understand the next step.
              </p>


              <div className="contact-info__items">

                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    @
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>Get in touch with our team</strong>
                  </div>
                </div>


                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    ↗
                  </div>

                  <div>
                    <span>WhatsApp</span>
                    <strong>Quick communication &amp; support</strong>
                  </div>
                </div>


                <div className="contact-info__item">
                  <div className="contact-info__icon">
                    ✓
                  </div>

                  <div>
                    <span>Response</span>
                    <strong>We&apos;ll get back to you shortly</strong>
                  </div>
                </div>

              </div>


              <div className="contact-info__note">

                <span className="contact-info__note-mark">
                  “
                </span>

                <p>
                  Every meaningful project starts with a clear
                  conversation.
                </p>

              </div>

            </aside>


            {/* =================================================
                FORM
            ================================================= */}

            <div className="contact-form-card">

              <div className="contact-form-card__header">

                <div>
                  <span className="contact-form-card__eyebrow">
                    ENQUIRY FORM
                  </span>

                  <h2>
                    How can we help?
                  </h2>
                </div>

                <span className="contact-form-card__step">
                  01 / 01
                </span>

              </div>


              <form
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
              >

                {/* Success */}

                {status === 'success' && (
                  <div
                    className="contact-form__banner contact-form__banner--success"
                    role="status"
                  >
                    <span>✓</span>

                    <div>
                      <strong>Enquiry received.</strong>
                      <p>
                        Thank you. We&apos;ll be in touch shortly.
                      </p>
                    </div>
                  </div>
                )}


                {/* Error */}

                {status === 'error' && (
                  <div
                    className="contact-form__banner contact-form__banner--error"
                    role="alert"
                  >
                    <span>!</span>

                    <div>
                      <strong>Something went wrong.</strong>
                      <p>{serverError}</p>
                    </div>
                  </div>
                )}


                {/* Name + Email */}

                <div className="contact-form__row">

                  <div className="contact-form__field">
                    <label htmlFor="name">
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange('name')}
                      aria-invalid={!!errors.name}
                    />

                    {errors.name && (
                      <span className="contact-form__error">
                        {errors.name}
                      </span>
                    )}
                  </div>


                  <div className="contact-form__field">
                    <label htmlFor="email">
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange('email')}
                      aria-invalid={!!errors.email}
                    />

                    {errors.email && (
                      <span className="contact-form__error">
                        {errors.email}
                      </span>
                    )}
                  </div>

                </div>


                {/* Phone + Service */}

                <div className="contact-form__row">

                  <div className="contact-form__field">
                    <label htmlFor="phone">
                      Phone / WhatsApp
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      aria-invalid={!!errors.phone}
                    />

                    {errors.phone && (
                      <span className="contact-form__error">
                        {errors.phone}
                      </span>
                    )}
                  </div>


                  <div className="contact-form__field">
                    <label htmlFor="service">
                      Interested Service
                    </label>

                    <select
                      id="service"
                      value={form.service}
                      onChange={handleChange('service')}
                      aria-invalid={!!errors.service}
                    >
                      <option value="">
                        Select a service
                      </option>

                      {services.map((service) => (
                        <option
                          key={service}
                          value={service}
                        >
                          {service}
                        </option>
                      ))}
                    </select>

                    {errors.service && (
                      <span className="contact-form__error">
                        {errors.service}
                      </span>
                    )}
                  </div>

                </div>


                {/* Message */}

                <div className="contact-form__field">

                  <div className="contact-form__label-row">
                    <label htmlFor="message">
                      Tell us about your requirement
                    </label>

                    <span>
                      Minimum 10 characters
                    </span>
                  </div>

                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Briefly describe your idea, project, research requirement or question..."
                    value={form.message}
                    onChange={handleChange('message')}
                    aria-invalid={!!errors.message}
                  />

                  {errors.message && (
                    <span className="contact-form__error">
                      {errors.message}
                    </span>
                  )}

                </div>


                {/* Submit */}

                <div className="contact-form__footer">

                  <p>
                    By submitting this form, you&apos;re starting a
                    conversation with Skyline Research Works.
                  </p>

                  <button
                    type="submit"
                    className="contact-form__submit"
                    disabled={status === 'submitting'}
                  >
                    <span>
                      {status === 'submitting'
                        ? 'Sending...'
                        : 'Send Enquiry'}
                    </span>

                    <span className="contact-form__submit-icon">
                      →
                    </span>
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}