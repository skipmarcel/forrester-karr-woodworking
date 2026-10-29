// Content comes from Sanity (project "vf8onmew", dataset "production").
// Edit it in the Studio: `cd studio && npm run dev`.
import { useEffect, useState } from 'react';
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const client = createClient({
  projectId: 'vf8onmew',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

// URL for a photo at a given width, in the best format the browser supports
export const imageUrl = (photo, width) => builder.image(photo).width(width).fit('max').auto('format').url();

// Width / height of a photo, after any crop set in the Studio
export function photoRatio(photo) {
  const { width, height } = photo.asset.metadata.dimensions;
  const c = photo.crop || { left: 0, right: 0, top: 0, bottom: 0 };
  return (width * (1 - c.left - c.right)) / (height * (1 - c.top - c.bottom));
}

const PHOTO = `{ alt, crop, hotspot, asset->{ _id, metadata { lqip, dimensions { width, height } } } }`;

const QUERY = `*[_id == "siteSettings"][0]{
  heroTitle, heroSubtitle, heroImage${PHOTO},
  "projects": projects[]->{ _id, title, description, mainImage${PHOTO}, details[]${PHOTO} },
  aboutText, aboutImage${PHOTO},
  contactTitle, contactIntro, projectTypes, email, phone, instagram
}`;

export function useSiteContent() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    client.fetch(QUERY).then(setContent, setError);
  }, []);

  return { content, error };
}
