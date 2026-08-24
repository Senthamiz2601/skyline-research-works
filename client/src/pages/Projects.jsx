import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import useFetch from '../hooks/useFetch';
import { projectsApi } from '../services/api';
import './shared.css';
import './Projects.css';

const categories = [
  'All',
  'AI/ML',
  'Web Development',
  'Data Science',
  'IoT',
  'Blockchain',
];

export default function Projects() {
  const [active, setActive] = useState('All');

  const {
    data,
    loading,
    error,
    refetch,
  } = useFetch(
    () => projectsApi.getAll({ category: active }),
    [active]
  );

  return (
    <>
      {/* Hero */}
      <section className="projects-hero">
        <div className="container projects-hero__inner">

          <div className="projects-hero__content">
            <span className="projects-hero__tag">
              OUR PROJECTS
            </span>

            <h1>
              Ideas into <span>Technology.</span>
            </h1>

            <p>
              A portfolio of research-driven technology projects across
              multiple domains, built to transform ideas into practical
              solutions.
            </p>
          </div>

          <div className="projects-hero__visual">
            <div className="project-orbit project-orbit--one"></div>
            <div className="project-orbit project-orbit--two"></div>

            <div className="project-node project-node--one">
              AI
            </div>

            <div className="project-node project-node--two">
              WEB
            </div>

            <div className="project-node project-node--three">
              IoT
            </div>

            <div className="project-core">
              <span>✦</span>
              <strong>BUILD</strong>
              <small>RESEARCH • TECH</small>
            </div>
          </div>

        </div>
      </section>


      {/* Projects */}
      <section className="projects-content">
        <div className="container">

          <div className="projects-heading">
            <div>
              <span>EXPLORE OUR WORK</span>

              <h2>
                Research & technology
                <strong> in action.</strong>
              </h2>
            </div>

            <p>
              Explore projects across AI, web development, data science,
              IoT and blockchain.
            </p>
          </div>


          {/* Category Filter */}
          <div className="projects-filter">
            <CategoryFilter
              categories={categories}
              active={active}
              onChange={setActive}
            />
          </div>


          {/* Loading */}
          {loading && (
            <div className="projects-state">
              <LoadingSpinner label="Loading projects…" />
            </div>
          )}


          {/* Error */}
          {error && (
            <div className="projects-state">
              <ErrorMessage
                message={error}
                onRetry={refetch}
              />
            </div>
          )}


          {/* Empty */}
          {data && data.length === 0 && (
            <div className="projects-empty">
              <div className="projects-empty__icon">
                ✦
              </div>

              <h3>No projects in this category yet</h3>

              <p>
                We are continuously building and documenting new
                research and technology projects.
              </p>

              <button
                type="button"
                onClick={() => setActive('All')}
              >
                View All Projects
                <span>→</span>
              </button>
            </div>
          )}


          {/* Projects */}
          {data && data.length > 0 && (
            <div className="projects-grid">
              {data.map((p) => (
                <ProjectCard
                  key={p._id}
                  project={p}
                />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}