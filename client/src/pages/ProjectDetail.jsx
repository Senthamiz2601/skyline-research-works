import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import useFetch from '../hooks/useFetch';
import { projectsApi } from '../services/api';
import './shared.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data, loading, error, refetch } = useFetch(() => projectsApi.getOne(slug), [slug]);

  if (loading) return <LoadingSpinner label="Loading project…" />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!data) return null;

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>{data.title}</h1>
          <p>{data.category}</p>
        </div>
      </section>
      <section className="content-section">
        <div className="container prose">
          {data.overview && <><h2>Overview</h2><p>{data.overview}</p></>}
          {data.problem && <><h2>Problem</h2><p>{data.problem}</p></>}
          {data.solution && <><h2>Solution</h2><p>{data.solution}</p></>}
          {data.technologies?.length > 0 && <><h2>Technologies</h2><p>{data.technologies.join(', ')}</p></>}
          {data.features?.length > 0 && (
            <>
              <h2>Features</h2>
              <ul>{data.features.map((f) => <li key={f}>{f}</li>)}</ul>
            </>
          )}
          {data.outcome && <><h2>Outcome</h2><p>{data.outcome}</p></>}
        </div>
      </section>
    </>
  );
}
