import React from 'react';
import { Link } from 'react-router-dom';
import './cards.css';

export default function ArticleCard({ article }) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const categoryClass = article.category
    ? article.category.toLowerCase().replace(/\s+/g, '-')
    : 'general';

  return (
    <article className="article-card">

      {/* Visual */}
      <div className={`article-card__visual article-card__visual--${categoryClass}`}>

        <div className="article-card__grid"></div>

        <div className="article-card__orb article-card__orb--one"></div>
        <div className="article-card__orb article-card__orb--two"></div>

        <div className="article-card__visual-top">
          <span className="article-card__visual-brand">
            SKYLINE
          </span>

          <span className="article-card__visual-number">
            {String(article._id || '').slice(-3) || '01'}
          </span>
        </div>

        <div className="article-card__visual-bottom">
          <span className="article-card__visual-label">
            KNOWLEDGE HUB
          </span>

          <span className="article-card__visual-line"></span>
        </div>

      </div>

      {/* Content */}
      <div className="article-card__content">

        <div className="article-card__category-row">
          <span className="article-card__category">
            {article.category}
          </span>

          <span className="article-card__arrow">
            ↗
          </span>
        </div>

        <h3 className="article-card__title">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="article-card__excerpt">
            {article.excerpt}
          </p>
        )}

        <div className="article-card__footer">

          <div className="article-card__meta">

            <span className="article-card__author">
              {article.author || 'Skyline Research Works'}
            </span>

            {date && (
              <>
                <span className="article-card__dot">•</span>
                <span>{date}</span>
              </>
            )}

          </div>

          <Link
            to={`/knowledge-hub/${article.slug}`}
            className="article-card__read"
            aria-label={`Read ${article.title}`}
          >
            <span>Read</span>
            <span className="article-card__read-icon">
              →
            </span>
          </Link>

        </div>

      </div>

    </article>
  );
}