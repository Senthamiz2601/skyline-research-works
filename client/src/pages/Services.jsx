import React from 'react';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import useFetch from '../hooks/useFetch';
import { servicesApi } from '../services/api';
import './shared.css';

export default function Services() {
  const { data, loading, error, refetch } = useFetch(() => servicesApi.getAll(), []);

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive support across the research and development lifecycle.</p>
        </div>
      </section>
      <section className="content-section">
        <div className="container">
          {loading && <LoadingSpinner label="Loading services…" />}
          {error && <ErrorMessage message={error} onRetry={refetch} />}
          {data && data.length === 0 && <EmptyState message="Services will appear here soon." />}
          {data && data.length > 0 && (
            <div className="grid-3">
              {data.map((s) => <ServiceCard key={s._id} service={s} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
