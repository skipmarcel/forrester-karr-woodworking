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

## Editing content (Sanity)

All text and photos come from [Sanity](https://www.sanity.io) (project `vf8onmew`, dataset `production`). Edit them in the Studio:

```bash
cd studio
npm install
npm run dev       # opens the Studio at http://localhost:3333
```

- **Site settings** – hero headline and photo, which projects show in Selected Works and in what order, About text and photo, contact details and form options.
- **Project** – one per gallery: title, description, main photo and detail photos (drag to reorder).

Published changes show on the site right away; no rebuild needed. To add a new project, create it under **Project**, publish, then add it to **Site settings → Selected works**.

When the site goes live on a new domain, allow it to read from Sanity:

```bash
cd studio && npx sanity cors add https://your-domain.com --no-credentials
```

## Where things live

- `src/sanity.js` – Sanity connection, the content query and image helpers.
- `src/components/` – one file per section (Nav, Hero, SelectedWorks, About, Contact).
- `src/styles.css` – all styling.
- `studio/` – the Sanity Studio (content types in `studio/schemaTypes/`).
- `public/fk.json` – the animated FK logo (Lottie).
- `public/fk-wordmark-stacked.svg` – the stacked "Forrester Karr Woodworking" wordmark.

## Contact form

The form currently opens the visitor's email app with a pre-filled message to the email set in Site settings. To receive submissions directly, connect a form service (Formspree, Netlify Forms, Basin, etc.) in `src/components/Contact.jsx`.

## To do

- Replace placeholder project descriptions (in the Studio, under **Project**).
- Add the Instagram link (Studio → **Site settings → Contact**).
