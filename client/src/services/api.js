import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Attach admin token if present (admin dashboard requests)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skyline_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalize error messages so pages can just read err.message
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || 'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);

export const projectsApi = {
  getAll: (params) => api.get('/projects', { params }).then((r) => r.data),
  getOne: (idOrSlug) => api.get(`/projects/${idOrSlug}`).then((r) => r.data),
  create: (data) => api.post('/projects', data).then((r) => r.data),
  update: (id, data) => api.put(`/projects/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/projects/${id}`).then((r) => r.data),
};

export const servicesApi = {
  getAll: () => api.get('/services').then((r) => r.data),
  getOne: (idOrSlug) => api.get(`/services/${idOrSlug}`).then((r) => r.data),
  create: (data) => api.post('/services', data).then((r) => r.data),
  update: (id, data) => api.put(`/services/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/services/${id}`).then((r) => r.data),
};

export const articlesApi = {
  getAll: (params) =>
    api.get('/articles', { params }).then((r) => r.data),

  getOne: (idOrSlug) =>
    api.get(`/articles/${idOrSlug}`).then((r) => r.data),

  getRelated: (slug) =>
    api.get(`/articles/related/${slug}`).then((r) => r.data),

  create: (data) =>
    api.post('/articles', data).then((r) => r.data),

  update: (id, data) =>
    api.put(`/articles/${id}`, data).then((r) => r.data),

  remove: (id) =>
    api.delete(`/articles/${id}`).then((r) => r.data),
};


export const internshipsApi = {
  getAll: (params) => api.get('/internships', { params }).then((r) => r.data),
  getOne: (idOrSlug) => api.get(`/internships/${idOrSlug}`).then((r) => r.data),
  create: (data) => api.post('/internships', data).then((r) => r.data),
  update: (id, data) => api.put(`/internships/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/internships/${id}`).then((r) => r.data),
};

export const testimonialsApi = {
  getAll: () => api.get('/testimonials').then((r) => r.data),
  create: (data) => api.post('/testimonials', data).then((r) => r.data),
  update: (id, data) => api.put(`/testimonials/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/testimonials/${id}`).then((r) => r.data),
};

export const faqsApi = {
  getAll: () => api.get('/faqs').then((r) => r.data),
  create: (data) => api.post('/faqs', data).then((r) => r.data),
  update: (id, data) => api.put(`/faqs/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/faqs/${id}`).then((r) => r.data),
};

export const enquiriesApi = {
  create: (data) => api.post('/enquiries', data).then((r) => r.data),
  getAll: () => api.get('/enquiries').then((r) => r.data),
  updateStatus: (id, status) => api.patch(`/enquiries/${id}/status`, { status }).then((r) => r.data),
  remove: (id) => api.delete(`/enquiries/${id}`).then((r) => r.data),
};

export const authApi = {
  login: (data) => api.post('/auth/login', data).then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data),
};

export const statsApi = {
  dashboard: () => api.get('/stats/dashboard').then((r) => r.data),
};

export default api;
