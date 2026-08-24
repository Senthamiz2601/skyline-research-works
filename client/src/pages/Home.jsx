import React from 'react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import StatCounter from '../components/StatCounter';
import ProjectCard from '../components/ProjectCard';
import ArticleCard from '../components/ArticleCard';
import TestimonialCard from '../components/TestimonialCard';
import FAQAccordion from '../components/FAQAccordion';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import useFetch from '../hooks/useFetch';
import {
  servicesApi,
  projectsApi,
  articlesApi,
  testimonialsApi,
  faqsApi
} from '../services/api';
import './Home.css';

const stats = [
  { value: '500+', label: 'Research Projects' },
  { value: '120+', label: 'Publications' },
  { value: '100%', label: 'Quality Focus' },
];

const howItWorks = [
  {
    step: '01',
    title: 'Tell Us Your Requirement',
    text: 'Share your idea, project requirement or research goal with us.'
  },
  {
    step: '02',
    title: 'Get the Right Guidance',
    text: 'We understand your requirement and suggest the right direction.'
  },
  {
    step: '03',
    title: 'Develop & Prepare',
    text: 'Turn the idea into a structured project, research or publication.'
  },
  {
    step: '04',
    title: 'Review & Improve',
    text: 'Refine the work through testing, review and continuous improvement.'
  },
  {
    step: '05',
    title: 'Complete Your Journey',
    text: 'Move forward with a complete and meaningful outcome.'
  },
];

export default function Home() {
  const services = useFetch(() => servicesApi.getAll(), []);
  const featuredProjects = useFetch(
    () => projectsApi.getAll({ featured: true }),
    []
  );
  const articles = useFetch(
    () => articlesApi.getAll({ category: 'All' }),
    []
  );
  const testimonials = useFetch(
    () => testimonialsApi.getAll(),
    []
  );
  const faqs = useFetch(
    () => faqsApi.getAll(),
    []
  );

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__inner">

          <div className="hero__copy">
            <h1>
              Transforming Ideas into Research &amp; Innovation
            </h1>

            <p className="hero__desc" style={{ textAlign: 'justify' }}>
              “From research ideas to real-world solutions, we bring the right guidance, technology and expertise to turn your vision into something meaningful.”
            </p>

            <div className="hero__ctas">
              <Button to="/services" variant="primary">
                Explore Our Services
              </Button>

              <Button to="/contact" variant="secondary">
                Start Your Journey
              </Button>
            </div>

            <div className="hero__stats">
              {stats.map((s) => (
                <StatCounter
                  key={s.label}
                  value={s.value}
                  label={s.label}
                />
              ))}
            </div>
          </div>


          <div className="hero__media">
            <div className="hero-visual">

              <div className="hero-visual__glow"></div>

              <div className="hero-visual__card hero-visual__card--main">

                <div className="hero-visual__top">
                  <span className="hero-visual__label">
                    RESEARCH WORKSPACE
                  </span>

                  <span className="hero-visual__status">
                    <span></span>
                    Active
                  </span>
                </div>

                <div className="hero-visual__title">
                  Turning Ideas<br />
                  Into Outcomes...
                </div>

                <div className="hero-visual__progress">

                  <div className="hero-visual__progress-head">
                    <span>Project Progress</span>
                    <strong>82%</strong>
                  </div>

                  <div className="hero-visual__progress-bar">
                    <span></span>
                  </div>

                </div>

                <div className="hero-visual__metrics">

                  <div>
                    <strong>96%</strong>
                    <span>Success Rate</span>
                  </div>

                  <div>
                    <strong>24/7</strong>
                    <span>Support</span>
                  </div>

                  <div>
                    <strong>Ideas</strong>
                    <span>Real Outcomes</span>
                  </div>

                </div>

              </div>


              <div className="hero-visual__floating hero-visual__floating--research">

                <div className="hero-visual__floating-icon">
                  ✦
                </div>

                <div>
                  <strong>Research</strong>
                  <span>Guidance &amp; Support</span>
                </div>

              </div>


              <div className="hero-visual__floating hero-visual__floating--tech">

                <div className="hero-visual__mini-chart">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div>
                  <strong>Technology</strong>
                  <span>Build • Test • Improve</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>


      {/* SERVICES */}
      <section className="services-section">
        <div className="container">

          <SectionHeading
            title="Our Core Services"
            subtitle="Comprehensive support across the research and development lifecycle."
          />

          {services.loading && (
            <LoadingSpinner label="Loading services…" />
          )}

          {services.error && (
            <ErrorMessage
              message={services.error}
              onRetry={services.refetch}
            />
          )}

          {services.data && services.data.length > 0 && (
            <div className="services-grid">
              {services.data.slice(0, 6).map((s) => (
                <ServiceCard
                  key={s._id}
                  service={s}
                />
              ))}
            </div>
          )}

        </div>
      </section>


      {/* FEATURED PROJECTS */}
      <section className="home-projects">
        <div className="container">

          <div className="featured-projects-heading">

            <div>
              <span className="featured-projects-label">
                OUR WORK
              </span>

              <h2>Featured Projects</h2>

              <p>
                A look at recent work across AI/ML, web, data science
                and emerging technologies.
              </p>
            </div>

            <Button
              to="/projects"
              variant="ghost"
            >
              View All Projects →
            </Button>

          </div>


          {featuredProjects.loading && (
            <LoadingSpinner />
          )}

          {featuredProjects.error && (
            <ErrorMessage
              message={featuredProjects.error}
              onRetry={featuredProjects.refetch}
            />
          )}


          {featuredProjects.data &&
            featuredProjects.data.length > 0 && (
              <div className="grid-3 featured-projects-grid">

                {featuredProjects.data
                  .slice(0, 3)
                  .map((p) => (
                    <ProjectCard
                      key={p._id}
                      project={p}
                    />
                  ))}

              </div>
            )}


          {featuredProjects.data &&
            featuredProjects.data.length === 0 && (

              <div className="portfolio-placeholder">

                <div className="portfolio-placeholder__icon">
                  +
                </div>

                <div>
                  <span>PROJECT PORTFOLIO</span>

                  <h3>
                    Our latest work is
                    <strong> taking shape.</strong>
                  </h3>

                  <p>
                    Explore our complete portfolio to discover research,
                    development and technology projects.
                  </p>
                </div>

              </div>

            )}

        </div>
      </section>


      {/* KNOWLEDGE HUB */}
      <section className="home-knowledge">
        <div className="container">

          <div className="knowledge-heading">

            <div>
              <span>INSIGHTS &amp; RESOURCES</span>

              <h2>Knowledge Hub</h2>

              <p>
                Guides and insights on research, publication,
                technology and careers.
              </p>
            </div>

            <Button
              to="/knowledge-hub"
              variant="ghost"
            >
              Browse Knowledge Hub →
            </Button>

          </div>


          {articles.loading && (
            <LoadingSpinner />
          )}

          {articles.error && (
            <ErrorMessage
              message={articles.error}
              onRetry={articles.refetch}
            />
          )}


          {articles.data &&
            articles.data.length > 0 && (

              <div className="grid-3">

                {articles.data
                  .slice(0, 3)
                  .map((a) => (
                    <ArticleCard
                      key={a._id}
                      article={a}
                    />
                  ))}

              </div>

            )}


          {articles.data &&
            articles.data.length === 0 && (

              <div className="knowledge-placeholder">

                <div className="knowledge-placeholder__number">
                  02
                </div>

                <div>
                  <span>KNOWLEDGE &amp; GUIDANCE</span>

                  <h3>
                    Useful insights are
                    <strong> coming soon.</strong>
                  </h3>

                  <p>
                    Explore the Knowledge Hub for practical resources
                    on research, technology and publication.
                  </p>
                </div>

              </div>

            )}

        </div>
      </section>


      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="container">

          <div className="how-heading">
            <span>OUR PROCESS</span>

            <h2>
              From idea to
              <strong> outcome.</strong>
            </h2>

            <p>
              A simple and structured process designed to keep
              your journey clear from beginning to completion.
            </p>
          </div>


          <div className="how-it-works">

            {howItWorks.map((step, index) => (

              <div
                key={step.step}
                className="how-it-works__step"
              >

                <div className="how-it-works__top">

                  <span className="how-it-works__num">
                    {step.step}
                  </span>

                  {index !== howItWorks.length - 1 && (
                    <span className="how-it-works__line"></span>
                  )}

                </div>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.text}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* TESTIMONIALS */}
      <section className="home-testimonials">
        <div className="container">

          <div className="testimonials-heading">

            <div>
              <span>CLIENT EXPERIENCE</span>

              <h2>What People Say</h2>

              <p>
                Feedback from students and researchers
                we've worked with.
              </p>
            </div>

          </div>


          {testimonials.loading && (
            <LoadingSpinner />
          )}

          {testimonials.error && (
            <ErrorMessage
              message={testimonials.error}
              onRetry={testimonials.refetch}
            />
          )}


          {testimonials.data &&
            testimonials.data.length > 0 && (

              <div className="grid-3">

                {testimonials.data
                  .slice(0, 3)
                  .map((t) => (
                    <TestimonialCard
                      key={t._id}
                      testimonial={t}
                    />
                  ))}

              </div>

            )}


          {testimonials.data &&
            testimonials.data.length === 0 && (

              <div className="testimonial-placeholder">

                <div className="testimonial-placeholder__quote">
                  “
                </div>

                <div>
                  <h3>
                    Your experience could be
                    <strong> featured here.</strong>
                  </h3>

                  <p>
                    We value every student's and researcher's
                    experience and look forward to sharing more
                    success stories.
                  </p>
                </div>

              </div>

            )}

        </div>
      </section>


      {/* FAQ */}
      <section className="faq-section">
        <div className="container">

          <div className="faq-heading">

            <span>NEED TO KNOW?</span>

            <h2>
              Frequently Asked
              <strong> Questions</strong>
            </h2>

            <p>
              Find quick answers to common questions about our
              research, project and publication services.
            </p>

          </div>


          {faqs.loading && (
            <LoadingSpinner />
          )}

          {faqs.error && (
            <ErrorMessage
              message={faqs.error}
              onRetry={faqs.refetch}
            />
          )}

          {faqs.data &&
            faqs.data.length > 0 && (

              <div className="faq-wrapper">
                <FAQAccordion items={faqs.data} />
              </div>

            )}

          {faqs.data &&
            faqs.data.length === 0 && (

              <div className="faq-placeholder">

                <span>FAQ</span>

                <h3>
                  Questions &amp; answers
                  <strong> coming soon.</strong>
                </h3>

                <p>
                  Have a question? Get in touch with us and
                  we'll be happy to help.
                </p>

                <Button
                  to="/contact"
                  variant="primary"
                >
                  Ask Us
                </Button>

              </div>

            )}

        </div>
      </section>


      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-section__inner">

          <h2>
            Ready to start your journey?
          </h2>

          <p>
            Tell us about your idea and we'll help you turn
            it into a real outcome.
          </p>

          <Button
            to="/contact"
            variant="primary"
          >
            Get in Touch
          </Button>

        </div>
      </section>

    </>
  );
}