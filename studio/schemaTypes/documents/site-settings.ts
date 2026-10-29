import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

// Singleton: all the site's text and the order of Selected Works
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'works', title: 'Selected works'},
    {name: 'about', title: 'About'},
    {name: 'contact', title: 'Contact'},
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Headline',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'heroSubtitle', title: 'Subheading', type: 'string', group: 'hero'}),
    defineField({
      name: 'heroImage',
      title: 'Background photo',
      type: 'photo',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'projects',
      title: 'Projects to show',
      type: 'array',
      group: 'works',
      description: 'Drag to set the order on the site. Projects not listed here are hidden.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
      validation: (rule) => rule.unique(),
    }),

    defineField({
      name: 'aboutText',
      title: 'About text',
      type: 'text',
      rows: 5,
      group: 'about',
      description: 'Leave a blank line between paragraphs.',
    }),
    defineField({name: 'aboutImage', title: 'About photo', type: 'photo', group: 'about'}),

    defineField({name: 'contactTitle', title: 'Heading', type: 'string', group: 'contact'}),
    defineField({name: 'contactIntro', title: 'Intro text', type: 'text', rows: 3, group: 'contact'}),
    defineField({
      name: 'projectTypes',
      title: 'Project types in the form',
      type: 'array',
      group: 'contact',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'email',
      type: 'string',
      group: 'contact',
      description: 'Inquiries from the contact form go to this address.',
      validation: (rule) => rule.email(),
    }),
    defineField({name: 'phone', type: 'string', group: 'contact'}),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'contact',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
