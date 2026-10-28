import { useState } from 'react';

const EMAIL = 'fkwoodworking@gmail.com';
const PHONE = '971 222 9333';
const INSTAGRAM = '#'; // TODO: add Instagram URL

export default function Contact() {
  const [note, setNote] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    const f = e.currentTarget.elements;
    const body = `Name: ${f.name.value}\nEmail: ${f.email.value}\nProject: ${f.type.value}\n\n${f.message.value}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Project inquiry: ' + f.type.value)}&body=${encodeURIComponent(body)}`;
    setNote('Opening your email app…');
  }

  return (
    <footer id="contact" className="contact">
      <h2 className="contact__title">Currently accepting new commissions.</h2>
      <p className="contact__intro">
        Tell Forrester about the room, the piece and your timeline. Photos and rough measurements help.
      </p>

      <form className="form" onSubmit={onSubmit}>
        <div className="form__row">
          <label className="field">Name<input name="name" required /></label>
          <label className="field">Email<input name="email" type="email" required /></label>
        </div>
        <label className="field">
          Project type
          <select name="type">
            <option>Kitchen</option>
            <option>Bathroom vanity</option>
            <option>Built-ins &amp; shelving</option>
            <option>Furniture</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="field">Project details<textarea name="message" rows={5} /></label>
        <div className="form__submit">
          <button type="submit" className="btn">Send inquiry</button>
          <span className="form__note" aria-live="polite">{note}</span>
        </div>
      </form>

      <div className="contact__links">
        <a href="tel:+19712229333">{PHONE}</a>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <a href={INSTAGRAM}>Follow on Instagram</a>
      </div>
      <div className="contact__copy">© {new Date().getFullYear()} Forrester Karr Woodworking</div>
    </footer>
  );
}
