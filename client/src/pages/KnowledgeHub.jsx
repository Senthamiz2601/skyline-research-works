import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import useFetch from '../hooks/useFetch';
import { articlesApi } from '../services/api';
import './KnowledgeHub.css';

const categories = ['All', 'Research', 'Publication', 'Technology', 'Career'];

export default function KnowledgeHub() {
  const [active, setActive] = useState('All');

  const {
    data,
    loading,
    error,
    refetch,
  } = useFetch(
    () => articlesApi.getAll({ category: active }),
    [active]
  );
  console.log('KNOWLEDGE HUB DATA:', data);
  console.log('KNOWLEDGE HUB LOADING:', loading);
  console.log('KNOWLEDGE HUB ERROR:', error);

  return (
    <div className="knowledge-hub">

      {/* Hero */}
      <section className="knowledge-hub__hero">
        <div className="container knowledge-hub__hero-inner">

          <div className="knowledge-hub__hero-content">

            <span className="knowledge-hub__eyebrow">
              KNOWLEDGE HUB
            </span>

            <h1>
              Learn. Explore.
              <br />
              <span>Build Better.</span>
            </h1>

            <p>
              Practical insights, research guidance, technology trends and
              career resources designed to help students, researchers and
              innovators move from ideas to meaningful outcomes.
            </p>

          </div>

          {/* Modern Knowledge Visual */}
          <div className="knowledge-hub__hero-visual">

            <div className="knowledge-hub__visual-grid"></div>

            <div className="knowledge-hub__visual-glow knowledge-hub__visual-glow--one"></div>
            <div className="knowledge-hub__visual-glow knowledge-hub__visual-glow--two"></div>

            <div className="knowledge-hub__visual-orbit knowledge-hub__visual-orbit--one"></div>
            <div className="knowledge-hub__visual-orbit knowledge-hub__visual-orbit--two"></div>

            <div className="knowledge-hub__visual-core">
              <div className="knowledge-hub__core-inner">
                <span>SRW</span>
                <small>KNOWLEDGE</small>
              </div>
            </div>

            <div className="knowledge-hub__visual-node knowledge-hub__visual-node--research">
              <span>R</span>
              <small>Research</small>
            </div>

            <div className="knowledge-hub__visual-node knowledge-hub__visual-node--publication">
              <span>P</span>
              <small>Publication</small>
            </div>

            <div className="knowledge-hub__visual-node knowledge-hub__visual-node--technology">
              <span>T</span>
              <small>Technology</small>
            </div>

            <div className="knowledge-hub__visual-node knowledge-hub__visual-node--career">
              <span>C</span>
              <small>Career</small>
            </div>

            <div className="knowledge-hub__visual-label">
              <span className="knowledge-hub__label-dot"></span>
              IDEAS → INSIGHTS
            </div>

          </div>

        </div>
      </section>
      {/* Articles */}
      <section className="knowledge-hub__content">
        <div className="container">

          <div className="knowledge-hub__filter">
            <div>
              <h2 className="knowledge-hub__filter-title">
                Explore Our Articles
              </h2>

              <p className="knowledge-hub__filter-subtitle">
                Insights curated for your research and technology journey.
              </p>
            </div>

            <CategoryFilter
              categories={categories}
              active={active}
              onChange={setActive}
            />
          </div>

          {loading && (
            <LoadingSpinner label="Loading articles…" />
          )}

          {error && (
            <ErrorMessage
              message={error}
              onRetry={refetch}
            />
          )}

          {!loading && !error && data && data.length === 0 && (
            <div className="knowledge-hub__empty">

              <div className="knowledge-hub__empty-content">

                <div className="knowledge-hub__empty-icon">
                  ✦
                </div>

                <h3>
                  New insights are on the way
                </h3>

                <p>
                  We are preparing useful research, publication and
                  technology resources for this section. Check back soon.
                </p>

              </div>

            </div>
          )}

          {!loading && !error && data && data.length > 0 && (
            <div className="knowledge-hub__grid">
              {data.map((article) => (
                <ArticleCard
                  key={article._id}
                  article={article}
                />
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="knowledge-hub__cta">
            <div className="knowledge-hub__cta-inner">

              <div className="knowledge-hub__cta-copy">
                <span>HAVE A QUESTION?</span>

                <h2>
                  Need guidance for your research journey?
                </h2>

                <p>
                  Let's discuss your idea and find the right direction.
                </p>
              </div>

              <Link
                to="/contact"
                className="knowledge-hub__cta-link"
              >
                Talk to Us →
              </Link>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}