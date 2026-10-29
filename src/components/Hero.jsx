import { imageUrl } from '../sanity.js';

export default function Hero({ title, subtitle, image }) {
  return (
    <section id="top" className="hero">
      {image?.asset && <img src={imageUrl(image, 2400)} alt={image.alt || ''} className="hero__img" />}
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__content">
        <div className="rule" />
        <h1 className="hero__title">{title}</h1>
        {subtitle && <div className="hero__sub">{subtitle}</div>}
      </div>
    </section>
  );
}
