import React from 'react';
import useFetch from '../../hooks/useFetch';
import { statsApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import './admin.css';

export default function AdminDashboard() {
  const { data, loading, error, refetch } = useFetch(() => statsApi.dashboard(), []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const cards = [
    { label: 'Total Projects', value: data.projects },
    { label: 'Total Articles', value: data.articles },
    { label: 'Total Internships', value: data.internships },
    { label: 'Total Testimonials', value: data.testimonials },
    { label: 'Total Enquiries', value: data.enquiries },
  ];

  return (
    <div className="admin-page">
      <h1>Dashboard</h1>
      <div className="admin-stats">
        {cards.map((c) => (
          <div key={c.label} className="admin-stat-card">
            <div className="admin-stat-card__value">{c.value}</div>
            <div className="admin-stat-card__label">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
