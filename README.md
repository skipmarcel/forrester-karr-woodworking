# Forrester Karr Woodworking

Showcase site for Forrester Karr Woodworking, built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # serves the built site locally
```

`dist/` can be deployed to Netlify, Vercel, GitHub Pages or any static host.

## Where things live

- `src/data/projects.js` – the Selected Works galleries: titles, descriptions, photos and how each photo is framed.
- `src/components/` – one file per section (Nav, Hero, SelectedWorks, About, Contact).
- `src/styles.css` – all styling.
- `public/images/` – project photos.
- `public/fk.json` – the animated FK logo (Lottie).
- `public/fk-wordmark.svg` – the "Forrester Karr Woodworking" wordmark.

## Editing galleries

Each project in `src/data/projects.js` has:

- `title`, `description`
- `main` – the large photo: `{ src, fit }`
- `details` – the smaller photos below it
- `detailRatio` – the box shape for the detail photos, e.g. `'4/3'`, `'1/1'`, `'3/4'`

`fit: 'contain'` shows the whole photo with white space around it; `fit: 'cover'` fills the box and crops.

## Contact form

The form currently opens the visitor's email app with a pre-filled message to fkwoodworking@gmail.com. To receive submissions directly, connect a form service (Formspree, Netlify Forms, Basin, etc.) in `src/components/Contact.jsx`.

## To do

- Replace placeholder project descriptions in `src/data/projects.js`.
- Add the Instagram link in `src/components/Contact.jsx`.
