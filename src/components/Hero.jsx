export default function Hero() {
  return (
    <section id="top" className="hero">
      <img src="/images/hero-beams.jpg" alt="Floating ceiling beams by Forrester Karr" className="hero__img" />
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__content">
        <div className="rule" />
        <h1 className="hero__title">Fine cabinetry, built by hand.</h1>
        <div className="hero__sub">Custom cabinetry + design</div>
      </div>
    </section>
  );
}
