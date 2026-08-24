# Skyline Research Works

Research. Innovation. Technology. Growth.
**Your Idea. Our Expertise. A Better Outcome.**

Full-stack website for Skyline Research Works — a research and technology support
platform offering Research Guidance, Project Assistance, Publication Support,
Internships, Documentation Support, and Career & Technical Guidance.

The frontend design system (colors, typography, spacing, button/card styles) is
pulled directly from the connected Figma file — see `DESIGN_SOURCE.md`.

## Stack

- **Frontend**: React, React Router, plain CSS with a token-based design system
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JWT + bcrypt for the admin dashboard

## Project structure

```
skyline-research-works/
├── client/            React frontend
│   └── src/
│       ├── components/    Reusable UI (Navbar, Footer, cards, states, etc.)
│       ├── layouts/       MainLayout (public site), AdminLayout (dashboard)
│       ├── pages/          Public pages + pages/admin
│       ├── services/api.js Axios client + one function group per resource
│       ├── context/        AuthContext (admin session)
│       └── styles/tokens.css  Design tokens copied from Figma
└── server/            Express + MongoDB backend
    ├── models/         Mongoose schemas (Project, Service, Article, Internship,
    │                   Testimonial, FAQ, Enquiry, Admin)
    ├── controllers/    Business logic (crudFactory.js is shared by most resources)
    ├── routes/         REST routes, one file per resource
    ├── middleware/      auth.js (JWT), errorHandler.js (centralized errors)
    └── seed/seed.js     Creates the first admin user + demo services/FAQs
```

## Running it locally

**1. Backend**

```bash
cd server
cp .env.example .env      # fill in MONGODB_URI, JWT_SECRET, SEED_ADMIN_EMAIL/PASSWORD
npm install
npm run seed               # creates your first admin user + demo services/FAQs
npm run dev                # http://localhost:5000
```

**2. Frontend**

```bash
cd client
cp .env.example .env       # REACT_APP_API_URL=http://localhost:5000/api
npm install
npm start                  # http://localhost:3000
```

Admin dashboard: `http://localhost:3000/admin/login`, using the
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` you set in `server/.env`.

## What's fully built vs. scaffolded

**Fully built:**
- All 8 Mongoose models, all REST routes/controllers (public reads + protected
  admin writes), JWT auth, centralized error handling, rate limiting on the
  enquiry endpoint.
- The full public frontend: every page in the spec, wired to the real API with
  loading / error / empty states throughout, category filtering (Projects,
  Knowledge Hub), FAQ accordion, animated stat counters, and a validated
  Contact form (client + server-side validation, duplicate-submit guard).
- The Home page hero and services section is implemented **1:1 from the
  connected Figma frame** (node `2:3`) — exact copy, colors, type scale, radii
  and shadow values.
- Admin: login, dashboard (live counts), and two full reference CRUD screens
  (Projects, Enquiries with status workflow).

**Scaffolded, following the same pattern:**
- Admin CRUD screens for Services, Knowledge Hub articles, Internships,
  Testimonials and FAQs aren't written out individually yet — `ProjectsAdmin.jsx`
  is the reference pattern (list → table → row actions) and the API layer for
  all of them already exists in `services/api.js`. Add a create/edit form and
  route for each the same way.
- Only the Home hero/services frame has been pulled from Figma so far. The
  other pages (About, Projects grid, Knowledge Hub, admin screens, etc.) use
  the same design tokens but aren't matched to individual Figma frames yet —
  send me the node links for those frames (e.g. `?node-id=X-Y` on each page/
  frame) and I'll pull them in and match the layouts exactly, the same way I
  did for the homepage.

## Environment variables

See `server/.env.example` and `client/.env.example`. Never commit a real `.env`
file — secrets (JWT_SECRET, MONGODB_URI, admin password) stay out of source
control and out of the frontend bundle entirely.
