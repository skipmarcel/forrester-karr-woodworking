import { useEffect, useRef, useState } from 'react';
import { imageUrl, photoRatio } from '../sanity.js';

const GAP = 16; // keep in sync with .works__gallery / .works__row gap

// Split photos (kept in order) into rows that each span the full width,
// picking the split whose row heights land closest to the target height.
function layoutRows(ratios, width, target) {
  const n = ratios.length;
  const best = Array(n + 1).fill(Infinity);
  const cut = Array(n + 1).fill(0);
  best[0] = 0;
  for (let j = 1; j <= n; j++) {
    for (let i = 0; i < j; i++) {
      const sum = ratios.slice(i, j).reduce((a, b) => a + b, 0);
      const height = (width - GAP * (j - i - 1)) / sum;
      const cost = best[i] + ((height - target) / target) ** 2;
      if (cost < best[j]) {
        best[j] = cost;
        cut[j] = i;
      }
    }
  }
  const rows = [];
  for (let j = n; j > 0; j = cut[j]) rows.unshift([cut[j], j]);
  return rows;
}

function Photo({ photo, alt }) {
  const lqip = photo.asset.metadata.lqip;
  return (
    <div className="photo" style={{ '--ratio': photoRatio(photo), backgroundImage: lqip && `url(${lqip})` }}>
      <img src={imageUrl(photo, 1600)} alt={photo.alt || alt} loading="lazy" />
    </div>
  );
}

export default function SelectedWorks({ projects }) {
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);
  const sectionRef = useRef(null);
  const p = projects[active];
  const photos = p ? [p.mainImage, ...(p.details || [])].filter((ph) => ph?.asset) : [];

  useEffect(() => {
    if (!sectionRef.current) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(sectionRef.current);
    return () => ro.disconnect();
  }, []);

  const target = Math.max(320, Math.min(600, window.innerHeight * 0.7));
  const rows = width
    ? layoutRows(photos.map(photoRatio), width, target)
    : photos.map((_, i) => [i, i + 1]);

  const renderTabs = (label, onSelect) => (
    <div role="tablist" aria-label={label} className="works__tabs">
      {projects.map((proj, i) => (
        <button
          key={proj._id}
          role="tab"
          aria-selected={i === active}
          aria-label={proj.title}
          className={'pill' + (i === active ? ' pill--active' : '')}
          onClick={() => {
            setActive(i);
            onSelect?.();
          }}
        >
          {String(i + 1).padStart(2, '0')}
        </button>
      ))}
    </div>
  );

  if (!p) return null;

  return (
    <section id="work" className="section works" ref={sectionRef}>
      <div className="rule" />
      <div className="works__head">
        <h2 className="section__label">Selected works</h2>
        {renderTabs('Projects')}
      </div>

      <div className="works__project" role="tabpanel" key={p._id}>
        <div className="works__text">
          <h3 className="works__title">{p.title}</h3>
          <p className="works__desc">{p.description}</p>
        </div>
        <div className="works__gallery">
          {rows.map(([start, end]) => (
            <div className="works__row" key={start}>
              {photos.slice(start, end).map((ph, k) => {
                const i = start + k;
                return (
                  <Photo
                    key={ph.asset._id + i}
                    photo={ph}
                    alt={i === 0 ? p.title : `${p.title}, detail ${i}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Repeat the project list below the gallery; picking one returns to the top of the section */}
      <div className="works__foot">
        {renderTabs('Projects, bottom of gallery', () => sectionRef.current.scrollIntoView())}
      </div>
    </section>
  );
}
