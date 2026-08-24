import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Publications from './pages/Publications';
import Internships from './pages/Internships';
import KnowledgeHub from './pages/KnowledgeHub';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProjects from './pages/admin/ProjectsAdmin';
import AdminEnquiries from './pages/admin/EnquiriesAdmin';
import AdminArticles from './pages/admin/ArticlesAdmin';

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/knowledge-hub" element={<KnowledgeHub />} />
          <Route path="/knowledge-hub/:slug" element={<ArticleDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="articles" element={<AdminArticles />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}