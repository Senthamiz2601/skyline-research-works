import React from 'react';
import useFetch from '../../hooks/useFetch';
import { enquiriesApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import EmptyState from '../../components/EmptyState';
import './admin.css';

export default function EnquiriesAdmin() {
  const { data, loading, error, refetch } = useFetch(() => enquiriesApi.getAll(), []);

  const handleStatusChange = async (id, status) => {
    await enquiriesApi.updateStatus(id, status);
    refetch();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    await enquiriesApi.remove(id);
    refetch();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="admin-page">
      <h1>Enquiries</h1>
      {data.length === 0 ? (
        <EmptyState title="No enquiries yet" message="Submissions from the Contact form will appear here." />
      ) : (
        <table className="admin-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Service</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e._id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.service}</td>
                <td>
                  <select className="admin-select" value={e.status} onChange={(ev) => handleStatusChange(e._id, ev.target.value)}>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td><button className="admin-btn-danger" onClick={() => handleDelete(e._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
