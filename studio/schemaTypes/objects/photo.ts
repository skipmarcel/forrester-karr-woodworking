import {defineField, defineType} from 'sanity'

// An image with alt text, used for every photo on the site
export const photo = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the photo for screen readers and search engines.',
      validation: (rule) => rule.required().warning('Alt text helps accessibility and SEO'),
    }),
  ],
})
