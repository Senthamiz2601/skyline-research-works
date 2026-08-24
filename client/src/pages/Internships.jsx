import React from 'react';
import InternshipCard from '../components/InternshipCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import useFetch from '../hooks/useFetch';
import { internshipsApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './shared.css';
import './Internships.css';

const internshipAreas = [
  {
    number: '01',
    title: 'AI / ML',
    text: 'Work on practical machine learning and AI-based applications.',
  },
  {
    number: '02',
    title: 'Full Stack',
    text: 'Build modern web applications using frontend and backend technologies.',
  },
  {
    number: '03',
    title: 'Python',
    text: 'Develop real-world applications using Python and its ecosystem.',
  },
  {
    number: '04',
    title: 'Data Science',
    text: 'Explore data analysis, visualization and predictive solutions.',
  },
];

export default function Internships() {
  const {
    data,
    loading,
    error,
    refetch,
  } = useFetch(() => internshipsApi.getAll(), []);

  const navigate = useNavigate();

  return (
    <>
      {/* Hero */}
      <section className="internship-hero">
        <div className="container internship-hero__inner">

          <div className="internship-hero__content">
            <span className="internship-hero__tag">
              INTERNSHIP PROGRAMS
            </span>

            <h1>
              Learn
              <span> Build </span>
              Grow
            </h1>

            <p>
              Gain practical exposure through technology-focused internship
              programs designed to help you learn by working on real-world
              projects.
            </p>

            <div className="internship-hero__actions">
              <button
                type="button"
                onClick={() => navigate('/contact')}
              >
                Apply for Internship
                <span>→</span>
              </button>

              <span className="internship-hero__note">
                Project-based learning
              </span>
            </div>
          </div>


          {/* Visual */}
          <div className="internship-hero__side">

            <div className="internship-stat">
              <span>01</span>
              <div>
                <strong>Learn</strong>
                <p>Industry-relevant skills</p>
              </div>
            </div>

            <div className="internship-stat">
              <span>02</span>
              <div>
                <strong>Build</strong>
                <p>Work on practical projects</p>
              </div>
            </div>

            <div className="internship-stat">
              <span>03</span>
              <div>
                <strong>Grow</strong>
                <p>Strengthen your portfolio</p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* Intro */}
      <section className="internship-intro">
        <div className="container internship-intro__grid">

          <div>
            <span className="section-label">
              WHY AN INTERNSHIP?
            </span>

            <h2>
              Turn your knowledge into
              <strong> practical experience.</strong>
            </h2>
          </div>

          <div>
            <p>
              Learning technology is only the beginning. Our internship
              programs are designed to help students apply what they learn,
              understand real development workflows and gain experience
              working with practical projects.
            </p>

            <p>
              Choose an area that matches your interests and take the next
              step toward building your technical portfolio.
            </p>
          </div>

        </div>
      </section>


      {/* Areas */}
      <section className="internship-areas">
        <div className="container">

          <div className="internship-section-heading">
            <span>AREAS OF LEARNING</span>

            <h2>
              Explore your
              <strong> area of interest.</strong>
            </h2>

            <p>
              Internship opportunities across some of the most relevant
              technology domains.
            </p>
          </div>


          <div className="internship-areas__grid">
            {internshipAreas.map((area) => (
              <div
                className="internship-area-card"
                key={area.number}
              >
                <span className="internship-area-card__number">
                  {area.number}
                </span>

                <h3>{area.title}</h3>

                <p>{area.text}</p>

                <span className="internship-area-card__arrow">
                  ↗
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* Available Programs */}
      <section className="internship-programs">
        <div className="container">

          <div className="internship-programs__heading">
            <div>
              <span>AVAILABLE PROGRAMS</span>

              <h2>
                Find the right
                <strong> internship.</strong>
              </h2>
            </div>

            <p>
              Explore currently available internship programs and choose
              the one that matches your learning goals.
            </p>
          </div>


          {loading && (
            <div className="internship-state">
              <LoadingSpinner label="Loading internships…" />
            </div>
          )}


          {error && (
            <div className="internship-state">
              <ErrorMessage
                message={error}
                onRetry={refetch}
              />
            </div>
          )}


          {data && data.length === 0 && (
            <div className="internship-empty">

              <div className="internship-empty__icon">
                +
              </div>

              <h3>
                New internship programs are coming soon
              </h3>

              <p>
                We are preparing practical internship opportunities for
                students across different technology domains.
              </p>

              <button
                type="button"
                onClick={() => navigate('/contact')}
              >
                Contact Us
                <span>→</span>
              </button>

            </div>
          )}


          {data && data.length > 0 && (
            <div className="internship-grid">
              {data.map((internship) => (
                <InternshipCard
                  key={internship._id}
                  internship={internship}
                  onApply={() => navigate('/contact')}
                />
              ))}
            </div>
          )}

        </div>
      </section>


      {/* CTA */}
      <section className="internship-cta">
        <div className="container internship-cta__inner">

          <div>
            <span>READY TO START?</span>

            <h2>
              Build experience
              <strong>   Build your future</strong>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate('/contact')}
          >
            Get in Touch
            <span>→</span>
          </button>

        </div>
      </section>
    </>
  );
}