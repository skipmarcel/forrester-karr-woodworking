import { useState } from 'react';

// "971 222 9333" -> "tel:+19712229333"
const telHref = (phone) => {
  const digits = phone.replace(/\D/g, '');
  return 'tel:+' + (digits.length === 10 ? '1' + digits : digits);
};

const CCB = 'CCB #257160'; // Oregon contractor's license
const FORMSPREE = 'https://formspree.io/f/myewkwaj'; // Forrester's Formspree form

export default function Contact({ title, intro, projectTypes, email, phone, instagram }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set('_subject', 'Project inquiry: ' + data.get('type'));
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <footer id="contact" className="contact">
      {title && <h2 className="contact__title">{title}</h2>}
      {intro && <p className="contact__intro">{intro}</p>}

      <form className="form" onSubmit={onSubmit}>
        <div className="form__row">
          <label className="field">Name<input name="name" required /></label>
          <label className="field">Email<input name="email" type="email" required /></label>
        </div>
        <label className="field">
          Project type
          <select name="type">
            {projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="field">Project details<textarea name="message" rows={5} /></label>
        {/* Spam trap: hidden from people, filled in by bots, rejected by Formspree */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
        <div className="form__submit">
          <button type="submit" className="btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send inquiry'}
          </button>
          <span className="form__note" aria-live="polite">
            {status === 'sent' && 'Thanks! Your message was sent. Forrester will be in touch soon.'}
            {status === 'error' && (
              <>
                Sorry, that didn't go through. Please try again or email{' '}
                <a href={`mailto:${email}`}>{email}</a>.
              </>
            )}
          </span>
        </div>
      </form>

      <div className="contact__meta">
        <div className="contact__links">
          {phone && <a href={telHref(phone)} className="contact__phone">{phone}</a>}
          {email && <a href={`mailto:${email}`} className="contact__email">{email}</a>}
          {/* Monospaced, so scaling by character count makes it exactly as wide as the email */}
          <span className="contact__ccb" style={email ? { fontSize: `calc(14px * ${email.length} / ${CCB.length})` } : undefined}>
            {CCB}
          </span>
          {instagram && (
            <a href={instagram} className="contact__instagram" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                <circle cx="12" cy="12" r="4.25" />
                <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          )}
        </div>
        <div className="contact__copy">© {new Date().getFullYear()} Forrester Karr, LLC</div>
      </div>
    </footer>
  );
}
