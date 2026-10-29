import { imageUrl } from '../sanity.js';

export default function About({ text = '', image }) {
  const paragraphs = text.split(/\n\s*\n/).filter((t) => t.trim());

  return (
    <section id="about" className="section about">
      <div className="rule" />
      <h2 className="section__label">About</h2>
      <div className="about__grid">
        {image?.asset && <img src={imageUrl(image, 1400)} alt={image.alt || ''} className="about__img" />}
        <div>
          {paragraphs.map((t, i) => (
            <p key={i} className="about__text">{t}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
