import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/articles', label: 'Knowledge Hub' },
  { to: '/admin/internships', label: 'Internships' },
  { to: '/admin/testimonials', label: 'Testimonials' },
  { to: '/admin/faqs', label: 'FAQs' },
  { to: '/admin/enquiries', label: 'Enquiries' },
];

export default function AdminLayout() {
  const { admin, loading, logout } = useAuth();

  if (loading) return null;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">Skyline Admin</div>
        <nav>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button className="admin-sidebar__logout" onClick={logout}>Log out</button>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
