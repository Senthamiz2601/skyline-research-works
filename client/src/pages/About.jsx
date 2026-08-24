import React from 'react';
import './shared.css';
import './About.css';

const values = [
  {
    number: '01',
    title: 'Research First',
    text: 'We focus on meaningful research, clear methodology and outcomes that add real value.',
  },
  {
    number: '02',
    title: 'Technology Driven',
    text: 'We combine modern technologies with practical development to turn ideas into working solutions.',
  },
  {
    number: '03',
    title: 'Quality Focused',
    text: 'From project development to publication support, we maintain a strong focus on quality and clarity.',
  },
  {
    number: '04',
    title: 'Impact Oriented',
    text: 'Our goal is not just to complete a project, but to create solutions with practical and measurable impact.',
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero">
        <div className="container about-hero__grid">

          <div className="about-hero__content">
            <span className="about-hero__tag">
              ABOUT SKYLINE RESEARCH WORKS
            </span>

            <h1>
              Research & <span>Technology</span>
            </h1>

            <p>
              Skyline Research Works is a research and technology support
              platform helping students, researchers and innovators transform
              ideas into practical, impactful outcomes.
            </p>

            <div className="about-hero__stats">
              <div>
                <strong>Research</strong>
                <span>Guidance & Support</span>
              </div>

              <div>
                <strong>Technology</strong>
                <span>Projects & Solutions</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="about-hero__visual">

            <div className="visual-circle visual-circle--one"></div>
            <div className="visual-circle visual-circle--two"></div>

            <div className="visual-line visual-line--one"></div>
            <div className="visual-line visual-line--two"></div>

            <div className="visual-dot visual-dot--one"></div>
            <div className="visual-dot visual-dot--two"></div>
            <div className="visual-dot visual-dot--three"></div>

            <div className="visual-card visual-card--main">
              <span className="visual-card__icon">✦</span>

              <div>
                <strong>Ideas → Impact</strong>
                <span>Research & Innovation</span>
              </div>
            </div>

            <div className="visual-card visual-card--small">
              <span>R</span>

              <div>
                <strong>Research</strong>
                <small>Explore • Build • Publish</small>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* Introduction */}
      <section className="about-intro">
        <div className="container about-intro__grid">

          <div className="about-intro__title">
            <span>WHO WE ARE</span>

            <h2>
              Turning ideas into
              <strong> meaningful outcomes.</strong>
            </h2>
          </div>

          <div className="about-intro__text">
            <p>
              Research can begin with a simple idea, but transforming that idea
              into a strong project, publication or technology solution requires
              the right guidance and execution.
            </p>

            <p>
              Skyline Research Works brings research guidance, project
              assistance, publication support and technology development together
              under one platform.
            </p>
          </div>

        </div>
      </section>


      {/* Mission & Vision */}
      <section className="about-purpose">
        <div className="container">

          <div className="about-section-label">
            <span>OUR PURPOSE</span>
            <h2>What drives us forward</h2>
          </div>

          <div className="purpose-grid">

            <div className="purpose-card">
              <div className="purpose-card__icon">M</div>

              <div>
                <span className="purpose-card__label">
                  OUR MISSION
                </span>

                <h3>Make research more accessible.</h3>

                <p>
                  To make research, technology and project development more
                  accessible, practical and outcome-oriented for students,
                  researchers and innovators.
                </p>
              </div>
            </div>

            <div className="purpose-card">
              <div className="purpose-card__icon">V</div>

              <div>
                <span className="purpose-card__label">
                  OUR VISION
                </span>

                <h3>Build an ecosystem for innovation.</h3>

                <p>
                  To build a trusted ecosystem where ideas, research and
                  technology come together to create meaningful and lasting
                  impact.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* Why Skyline */}
      <section className="about-values">
        <div className="container">

          <div className="about-values__header">
            <div>
              <span>WHY SKYLINE?</span>

              <h2>
                Built around
                <br />
                <strong>better outcomes.</strong>
              </h2>
            </div>

            <p>
              We believe strong outcomes come from combining research,
              technology, guidance and consistent execution.
            </p>
          </div>

          <div className="values-grid">
            {values.map((value) => (
              <div className="value-card" key={value.number}>

                <span className="value-card__number">
                  {value.number}
                </span>

                <h3>{value.title}</h3>

                <p>{value.text}</p>

                <span className="value-card__arrow">↗</span>

              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}