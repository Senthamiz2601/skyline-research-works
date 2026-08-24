import React from 'react';
import './CategoryFilter.css';

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="category-filter" role="tablist" aria-label="Filter by category">
      {categories.map((c) => (
        <button
          key={c}
          role="tab"
          aria-selected={active === c}
          className={`category-filter__btn ${active === c ? 'category-filter__btn--active' : ''}`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
