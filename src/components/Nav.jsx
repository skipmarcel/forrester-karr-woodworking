import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';

export default function Nav() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <nav className={'nav' + (open ? ' nav--open' : '')}>
      <div className="nav__fade" aria-hidden="true" />
      <a href="#top" className="nav__brand" aria-label="Forrester Karr Woodworking, home" onClick={() => setOpen(false)}>
        <Logo />
        <img src="/fk-wordmark-stacked.svg" alt="Forrester Karr Woodworking" className="nav__wordmark" />
      </a>
      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="nav-links"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>
      <div className="nav__links" id="nav-links" onClick={(e) => e.target.closest('a') && setOpen(false)}>
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
