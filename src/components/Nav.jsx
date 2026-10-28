import Logo from './Logo.jsx';

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav__fade" aria-hidden="true" />
      <a href="#top" className="nav__brand" aria-label="Forrester Karr Woodworking, home">
        <Logo />
        <img src="/fk-wordmark.svg" alt="Forrester Karr Woodworking" className="nav__wordmark" />
      </a>
      <div className="nav__links">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
