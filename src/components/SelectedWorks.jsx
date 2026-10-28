import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects.js';

const GAP = 16; // keep in sync with .works__gallery / .works__row gap
const FALLBACK_RATIO = 4 / 3; // used until a photo loads and reports its real shape

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

function Photo({ src, ratio, alt, onRatio }) {
  return (
    <div className={'photo' + (src ? '' : ' photo--empty')} style={{ '--ratio': ratio }}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={(e) => onRatio(src, e.target.naturalWidth / e.target.naturalHeight)}
        />
      ) : (
        <div className="photo__empty">Photo coming soon</div>
      )}
    </div>
  );
}

export default function SelectedWorks() {
  const [active, setActive] = useState(0);
  const [ratios, setRatios] = useState({});
  const [width, setWidth] = useState(0);
  const sectionRef = useRef(null);
  const p = projects[active];
  const photos = [p.main, ...p.details];

  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(sectionRef.current);
    return () => ro.disconnect();
  }, []);

  const ratioOf = (src) => ratios[src] || FALLBACK_RATIO;
  const setRatio = (src, r) => setRatios((prev) => (prev[src] === r ? prev : { ...prev, [src]: r }));

  const target = Math.max(320, Math.min(600, window.innerHeight * 0.7));
  const rows = width
    ? layoutRows(photos.map((ph) => ratioOf(ph.src)), width, target)
    : photos.map((_, i) => [i, i + 1]);

  return (
    <section id="work" className="section works" ref={sectionRef}>
      <div className="rule" />
      <div className="works__head">
        <h2 className="section__label">Selected works</h2>
        <div role="tablist" aria-label="Projects" className="works__tabs">
          {projects.map((proj, i) => (
            <button
              key={proj.id}
              role="tab"
              aria-selected={i === active}
              aria-label={proj.title}
              className={'pill' + (i === active ? ' pill--active' : '')}
              onClick={() => setActive(i)}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      <div className="works__project" role="tabpanel" key={p.id}>
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
                    key={ph.src || i}
                    src={ph.src}
                    ratio={ratioOf(ph.src)}
                    alt={i === 0 ? p.title : `${p.title}, detail ${i}`}
                    onRatio={setRatio}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
