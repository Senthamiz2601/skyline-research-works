import React from 'react';
import useFetch from '../../hooks/useFetch';
import { projectsApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import EmptyState from '../../components/EmptyState';
import './admin.css';

// Reference implementation for an admin CRUD screen. The same list/delete
// pattern (list -> table -> row actions) applies to Services, Articles,
// Internships, Testimonials and FAQs — swap the API module and columns.
export default function ProjectsAdmin() {
  const { data, loading, error, refetch } = useFetch(() => projectsApi.getAll(), []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    await projectsApi.remove(id);
    refetch();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="admin-page">
      <h1>Projects</h1>
      {data.length === 0 ? (
        <EmptyState title="No projects yet" message="Create your first project via the API to see it listed here." />
      ) : (
        <table className="admin-table">
          <thead>
            <tr><th>Title</th><th>Category</th><th>Status</th><th>Featured</th><th></th></tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>{p.status}</td>
                <td>{p.featured ? 'Yes' : 'No'}</td>
                <td><button className="admin-btn-danger" onClick={() => handleDelete(p._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
