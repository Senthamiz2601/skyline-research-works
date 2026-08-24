import React from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ArticleCard from '../components/ArticleCard';
import useFetch from '../hooks/useFetch';
import { articlesApi } from '../services/api';
import './ArticleDetail.css';

export default function ArticleDetail() {
  const { slug } = useParams();

  const {
    data: article,
    loading,
    error,
    refetch,
  } = useFetch(
    () => articlesApi.getOne(slug),
    [slug]
  );

  const {
    data: relatedArticles,
    loading: relatedLoading,
  } = useFetch(
    () => articlesApi.getRelated(slug),
    [slug]
  );

  if (loading) {
    return <LoadingSpinner label="Loading article…" />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (!article) {
    return null;
  }

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <div className="article-detail">

      {/* =========================================
          ARTICLE HERO
      ========================================= */}

      <section className="article-detail__hero">
        <div className="container">

          <Link
            to="/knowledge-hub"
            className="article-detail__back"
          >
            ← Back to Knowledge Hub
          </Link>

          <div className="article-detail__category">
            {article.category}
          </div>

          <h1>
            {article.title}
          </h1>

          <p className="article-detail__excerpt">
            {article.excerpt}
          </p>

          <div className="article-detail__meta">

            <span>
              By {article.author || 'Skyline Research Works'}
            </span>

            {publishedDate && (
              <>
                <span className="article-detail__dot">
                  •
                </span>

                <span>
                  {publishedDate}
                </span>
              </>
            )}

          </div>

        </div>
      </section>


      {/* =========================================
          COVER IMAGE
      ========================================= */}

      {article.coverImage && (
        <section className="article-detail__cover">
          <div className="container">

            <div className="article-detail__cover-wrapper">

              <img
                src={article.coverImage}
                alt={article.title}
                className="article-detail__cover-image"
              />

            </div>

          </div>
        </section>
      )}


      {/* =========================================
          ARTICLE CONTENT
      ========================================= */}

      <section className="article-detail__content">
        <div className="container">

          <article className="article-detail__body">

            {article.content
              .split('\n')
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}

          </article>


          {/* =====================================
              TAGS
          ===================================== */}

          {article.tags?.length > 0 && (
            <div className="article-detail__tags">

              <span className="article-detail__tags-title">
                Topics
              </span>

              <div className="article-detail__tag-list">

                {article.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="article-detail__tag"
                  >
                    #{tag}
                  </span>
                ))}

              </div>

            </div>
          )}

        </div>
      </section>


      {/* =========================================
          RELATED ARTICLES
      ========================================= */}

      {!relatedLoading &&
        relatedArticles?.length > 0 && (
          <section className="article-detail__related">
            <div className="container">

              <div className="article-detail__related-header">

                <div>
                  <span>
                    KEEP READING
                  </span>

                  <h2>
                    Related Articles
                  </h2>
                </div>

                <Link
                  to="/knowledge-hub"
                  className="article-detail__all-link"
                >
                  View All →
                </Link>

              </div>

              <div className="grid-3">

                {relatedArticles.map((articleItem) => (
                  <ArticleCard
                    key={articleItem._id}
                    article={articleItem}
                  />
                ))}

              </div>

            </div>
          </section>
        )}

    </div>
  );
}