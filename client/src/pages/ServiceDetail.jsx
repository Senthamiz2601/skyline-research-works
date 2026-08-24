import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import useFetch from '../hooks/useFetch';
import { servicesApi } from '../services/api';
import './ServiceDetail.css';

const serviceContent = {
  'Research Guidance': {
    intro:
      'Have a research idea but not sure where to begin? We help you turn a broad idea into a clear, structured and research-ready direction.',
    features: [
      'Research topic and problem identification',
      'Research methodology planning',
      'Literature review guidance',
      'Research objectives and scope',
      'Technical and implementation direction',
      'Research documentation support',
    ],
  },

  'Project Assistance': {
    intro:
      'From an initial concept to a working solution, we provide practical technical support to help you plan, develop and present your project with confidence.',
    features: [
      'Project idea and requirement analysis',
      'Technology and architecture selection',
      'Software and application development',
      'AI/ML and data-driven solutions',
      'Testing and project refinement',
      'Project demonstration and presentation support',
    ],
  },

  'Publication Support': {
    intro:
      'Good research deserves to be presented clearly. We help you prepare your work for journals and conferences with structured technical and publication support.',
    features: [
      'Research paper structure and preparation',
      'Journal and conference formatting',
      'Technical writing and refinement',
      'Reference and citation guidance',
      'Revision and improvement support',
      'Submission readiness guidance',
    ],
  },

  'Internship Programs': {
    intro:
      'Move beyond classroom learning with practical exposure to real technologies, development workflows and guided project work.',
    features: [
      'Hands-on project experience',
      'AI/ML and Python development',
      'Web and full-stack development',
      'Data science and analytics',
      'IoT and emerging technologies',
      'Project guidance and technical mentoring',
    ],
  },

  'Documentation Support': {
    intro:
      'Clear documentation makes good technical work easier to understand, present and evaluate. We help structure your work into professional deliverables.',
    features: [
      'Project report preparation',
      'Research documentation',
      'Technical documentation',
      'System architecture and diagrams',
      'Presentation and project materials',
      'Documentation review and refinement',
    ],
  },

  'Career & Technical Guidance': {
    intro:
      'Not sure which technology to learn, what project to build or where your skills should take you? We help you choose a practical direction.',
    features: [
      'Technology and skill-roadmap guidance',
      'Project selection and planning',
      'Technical skill development direction',
      'Portfolio and project guidance',
      'Career-focused technical preparation',
      'Next-step planning and mentoring',
    ],
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();

  const { data, loading, error, refetch } = useFetch(
    () => servicesApi.getOne(slug),
    [slug]
  );

  if (loading) {
    return <LoadingSpinner label="Loading service…" />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (!data) {
    return null;
  }

  const content = serviceContent[data.title] || {
    intro: data.description,
    features: [],
  };

  return (
    <main className="service-detail">

      {/* Hero */}
      <section className="service-detail__hero">
        <div className="container">
          <div className="service-detail__hero-content">

            <span className="service-detail__eyebrow">
              SKYLINE RESEARCH WORKS
            </span>

            <h1>{data.title}</h1>

            {data.tagline && (
              <p className="service-detail__tagline">
                {data.tagline}
              </p>
            )}

          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="service-detail__intro">
        <div className="container">
          <div className="service-detail__intro-grid">

            <div>
              <span className="service-detail__label">
                WHY THIS SERVICE
              </span>

              <h2>
                The right support can make
                <span> the next step clearer.</span>
              </h2>
            </div>

            <div className="service-detail__intro-copy">
              <p>{content.intro}</p>

              <p className="service-detail__description">
                {data.description}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      {content.features.length > 0 && (
        <section className="service-detail__features">
          <div className="container">

            <div className="service-detail__section-heading">
              <div>
                <span className="service-detail__label">
                  WHAT WE CAN HELP WITH
                </span>

                <h2>Support built around your needs.</h2>
              </div>

              <p>
                Practical guidance and support across the key stages of
                your journey.
              </p>
            </div>

            <div className="service-detail__feature-grid">
              {content.features.map((feature, index) => (
                <div className="service-detail__feature-card" key={feature}>
                  <span className="service-detail__feature-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h3>{feature}</h3>

                  <span className="service-detail__arrow">
                    →
                  </span>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* Process */}
      <section className="service-detail__process">
        <div className="container">

          <div className="service-detail__process-header">
            <span className="service-detail__label">
              HOW WE WORK
            </span>

            <h2>From your requirement to a clear outcome.</h2>

            <p>
              We keep the process straightforward, collaborative and
              focused on what you actually need.
            </p>
          </div>

          <div className="service-detail__steps">

            <div className="service-detail__step">
              <span>01</span>
              <div>
                <h3>Understand</h3>
                <p>
                  We understand your idea, requirement or challenge.
                </p>
              </div>
            </div>

            <div className="service-detail__step">
              <span>02</span>
              <div>
                <h3>Plan</h3>
                <p>
                  We identify the right approach, tools and next steps.
                </p>
              </div>
            </div>

            <div className="service-detail__step">
              <span>03</span>
              <div>
                <h3>Work Together</h3>
                <p>
                  We provide the guidance and technical support required.
                </p>
              </div>
            </div>

            <div className="service-detail__step">
              <span>04</span>
              <div>
                <h3>Move Forward</h3>
                <p>
                  You leave with a clearer direction and a stronger outcome.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="service-detail__cta">
        <div className="container">
          <div className="service-detail__cta-inner">

            <div>
              <span className="service-detail__label">
                READY TO GET STARTED?
              </span>

              <h2>
                Let's work on your
                <span> next step.</span>
              </h2>

              <p>
                Tell us what you're working on. We'll help you figure out
                the right way forward.
              </p>
            </div>

            <Button to="/contact" variant="primary">
              Start a Conversation →
            </Button>

          </div>
        </div>
      </section>

    </main>
  );
}