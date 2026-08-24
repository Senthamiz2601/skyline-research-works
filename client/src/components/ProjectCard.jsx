import React from 'react';
import { Link } from 'react-router-dom';
import './cards.css';

export default function ProjectCard({ project }) {
  return (
    <div className="card">
      <div className="card__image">
        {project.image ? <img src={project.image} alt={project.title} /> : <div className="card__image--placeholder" />}
      </div>
      <div className="card__body">
        <span className="card__tag">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.technologies?.length > 0 && (
          <div className="card__chips">
            {project.technologies.slice(0, 4).map((t) => <span key={t}>{t}</span>)}
          </div>
        )}
        <Link to={`/projects/${project.slug}`} className="card__link">View Project →</Link>
      </div>
    </div>
  );
}
