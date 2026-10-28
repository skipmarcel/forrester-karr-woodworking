export default function About() {
  return (
    <section id="about" className="section about">
      <div className="rule" />
      <h2 className="section__label">About</h2>
      <div className="about__grid">
        <img src="/images/forrester-shop.png" alt="Forrester Karr in his shop" className="about__img" />
        <p className="about__text">
          Forrester builds fine cabinetry and furniture for homes, working directly with clients from first drawing to final install.
        </p>
      </div>
    </section>
  );
}
