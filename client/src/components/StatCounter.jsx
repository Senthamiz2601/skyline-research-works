import React, { useEffect, useRef, useState } from 'react';
import './StatCounter.css';

// Animates a numeric prefix (e.g. "500+" -> counts 0..500 then appends the "+").
export default function StatCounter({ value, label }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const numeric = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';
  const [display, setDisplay] = useState(numeric === null ? value : 0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (numeric === null) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            setDisplay(Math.floor(progress * numeric));
            if (progress < 1) requestAnimationFrame(step);
            else setDisplay(numeric);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [numeric]);

  return (
    <div className="stat-counter" ref={ref}>
      <div className="stat-counter__value">{numeric === null ? value : `${display}${suffix}`}</div>
      <div className="stat-counter__label">{label}</div>
    </div>
  );
}
