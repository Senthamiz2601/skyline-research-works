import React from 'react';
import SectionHeading from '../components/SectionHeading';
import './shared.css';
import './Publications.css';

const researchGuidance = [
  'Idea & Topic Selection',
  'Literature & Problem Analysis',
  'Methodology & Implementation',
  'Research Documentation',
];

const publicationSupport = [
  'Journal Publications',
  'Conference Publications',
  'Research Paper Formatting',
  'Submission Guidance',
];

const resources = [
  {
    title: 'Journal vs Conference',
    text: 'Understand the key differences between journals and conferences before choosing where to publish.',
  },
  {
    title: 'Scopus Guide',
    text: 'Learn the fundamentals of Scopus-indexed publications and how to identify suitable venues.',
  },
];

/*
  Add your actual published papers here.

  Example:

  {
    title: 'Your Paper Title',
    venue: 'IEEE Conference',
    year: '2026',
    type: 'Conference',
    link: 'https://your-paper-link.com'
  }
*/

const publications = [
  {
    id: '11376581',
    title: 'IEEE Xplore Publication',
    venue: 'IEEE Xplore',
    year: '2026',
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/11376581',
  },
  {
    id: '11346339',
    title: 'IEEE Xplore Publication',
    venue: 'IEEE Xplore',
    year: '2026',
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/11346339',
  },
  {
    id: '11437020',
    title: 'IEEE Xplore Publication',
    venue: 'IEEE Xplore',
    year: '2026',
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/11437020',
  },
  {
    id: '11485510',
    title: 'IEEE Xplore Publication',
    venue: 'IEEE Xplore',
    year: '2026',
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/11485510',
  },
  {
    id: '11401651',
    title: 'IEEE Xplore Publication',
    venue: 'IEEE Xplore',
    year: '2026',
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/11401651',
  },
  {
    id: '11324203',
    title: 'IEEE Xplore Publication',
    venue: 'IEEE Xplore',
    year: '2026',
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/11324203',
  },
  {
    id: '11495913',
    title: 'IEEE Xplore Publication',
    venue: 'IEEE Xplore',
    year: '2026',
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/11495913',
  },
  {
    id: '11382970',
    title: 'IEEE Xplore Publication',
    venue: 'IEEE Xplore',
    year: '2026',
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/11382970',
  },
  {
    id: '11368594',
    title: 'IEEE Xplore Publication',
    venue: 'IEEE Xplore',
    year: '2026',
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/11368594',
  },
  {
    id: '11315681',
    title: 'IEEE Xplore Publication',
    venue: 'IEEE Xplore',
    year: '2026',
    type: 'Conference',
    link: 'https://ieeexplore.ieee.org/document/11315681',
  },
];

export default function Publications() {
  return (
    <>
      {/* Hero */}
      <section className="publication-hero">
        <div className="container publication-hero__inner">

          <div className="publication-hero__content">
            <span className="publication-hero__tag">
              RESEARCH & PUBLICATION
            </span>

            <h1>
              From <span>Research</span>
              <br />
              to Publication.
            </h1>

            <p>
              Supporting researchers through idea development, technical
              implementation, documentation and publication with a
              structured approach.
            </p>

            <div className="publication-hero__stats">
              <div>
                <strong>Research</strong>
                <span>Guidance</span>
              </div>

              <div>
                <strong>Publication</strong>
                <span>Support</span>
              </div>

              <div>
                <strong>Technical</strong>
                <span>Assistance</span>
              </div>
            </div>
          </div>


          {/* Visual */}
          <div className="publication-hero__visual">

            <div className="publication-document">
              <div className="document-top">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="document-line document-line--long"></div>
              <div className="document-line"></div>
              <div className="document-line document-line--medium"></div>

              <div className="document-chart">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="document-line"></div>
              <div className="document-line document-line--medium"></div>
            </div>

            <div className="publication-badge publication-badge--one">
              <strong>01</strong>
              <span>Research</span>
            </div>

            <div className="publication-badge publication-badge--two">
              <strong>02</strong>
              <span>Publish</span>
            </div>

          </div>

        </div>
      </section>


      {/* Research & Publication Support */}
      <section className="publication-support">
        <div className="container">

          <div className="publication-section-heading">
            <span>HOW WE SUPPORT</span>

            <h2>
              Research needs more than
              <strong> just an idea.</strong>
            </h2>

            <p>
              We provide structured support throughout the research journey,
              from defining the problem to preparing the final publication.
            </p>
          </div>


          <div className="support-grid">

            {/* Research */}
            <div className="support-card">

              <div className="support-card__top">
                <span className="support-card__number">
                  01
                </span>

                <span className="support-card__icon">
                  R
                </span>
              </div>

              <h3>Research Guidance</h3>

              <p>
                Build a strong foundation for your research with proper
                planning, methodology and technical direction.
              </p>

              <div className="support-list">
                {researchGuidance.map((item, index) => (
                  <div className="support-list__item" key={item}>
                    <span>0{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

            </div>


            {/* Publication */}
            <div className="support-card support-card--featured">

              <div className="support-card__top">
                <span className="support-card__number">
                  02
                </span>

                <span className="support-card__icon">
                  P
                </span>
              </div>

              <h3>Publication Support</h3>

              <p>
                Prepare your research for journals and conferences with
                professional formatting and submission guidance.
              </p>

              <div className="support-list">
                {publicationSupport.map((item, index) => (
                  <div className="support-list__item" key={item}>
                    <span>0{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Published Work */}
      <section className="published-work">
        <div className="container">

          <div className="published-work__heading">
            <div>
              <span>OUR RESEARCH WORK</span>

              <h2>
                Published
                <strong> work.</strong>
              </h2>
            </div>

            <p>
              Explore research papers and publications supported through
              research, development and technical assistance.
            </p>
          </div>


          {publications.length > 0 ? (
            <div className="publication-grid">

              {publications.map((paper) => (
                <article
                  className="publication-card"
                  key={paper.id}
                >
                  <div className="publication-card__top">
                    <span>{paper.type}</span>
                    <span>{paper.year}</span>
                  </div>

                  <h3>{paper.title}</h3>

                  <p>{paper.venue}</p>

                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Publication
                    <span>↗</span>
                  </a>
                </article>
              ))}

            </div>
          ) : (
            <div className="published-empty">

              <div className="published-empty__icon">
                ↗
              </div>

              <h3>Research publications coming here</h3>

              <p>
                Our research and publication portfolio will be showcased
                here with direct links to published work.
              </p>

            </div>
          )}

        </div>
      </section>


      {/* Resources */}
      <section className="publication-resources">
        <div className="container">

          <div className="resources-heading">
            <span>RESEARCH RESOURCES</span>

            <h2>
              Useful guides for
              <strong> researchers.</strong>
            </h2>
          </div>

          <div className="resources-grid">

            {resources.map((resource, index) => (
              <div className="resource-card" key={resource.title}>

                <span className="resource-card__number">
                  0{index + 1}
                </span>

                <h3>{resource.title}</h3>

                <p>{resource.text}</p>

                <span className="resource-card__arrow">
                  ↗
                </span>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="publication-cta">
        <div className="container publication-cta__inner">

          <div>
            <span>HAVE A RESEARCH IDEA?</span>

            <h2>
              Let's take your research
              <strong> forward.</strong>
            </h2>
          </div>

          <a href="/contact">
            Discuss Your Research
            <span>→</span>
          </a>

        </div>
      </section>
    </>
  );
}