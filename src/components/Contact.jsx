import { useState } from 'react';

// "971 222 9333" -> "tel:+19712229333"
const telHref = (phone) => {
  const digits = phone.replace(/\D/g, '');
  return 'tel:+' + (digits.length === 10 ? '1' + digits : digits);
};

export default function Contact({ title, intro, projectTypes, email, phone, instagram }) {
  const [note, setNote] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    const f = e.currentTarget.elements;
    const body = `Name: ${f.name.value}\nEmail: ${f.email.value}\nProject: ${f.type.value}\n\n${f.message.value}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent('Project inquiry: ' + f.type.value)}&body=${encodeURIComponent(body)}`;
    setNote('Opening your email app…');
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
        <div className="form__submit">
          <button type="submit" className="btn">Send inquiry</button>
          <span className="form__note" aria-live="polite">{note}</span>
        </div>
      </form>

      <div className="contact__links">
        {phone && <a href={telHref(phone)}>{phone}</a>}
        {email && <a href={`mailto:${email}`}>{email}</a>}
        {instagram && <a href={instagram}>Follow on Instagram</a>}
      </div>
      <div className="contact__copy">© {new Date().getFullYear()} Forrester Karr Woodworking</div>
    </footer>
  );
}
