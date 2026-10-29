import {defineArrayMember, defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'Wood, finish and scope of the project.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main photo',
      type: 'photo',
      description: 'Shown first in the gallery.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'details',
      title: 'Detail photos',
      type: 'array',
      description: 'Drag to reorder. The gallery arranges them in rows automatically.',
      of: [defineArrayMember({type: 'photo'})],
      options: {layout: 'grid'},
    }),
  ],
  preview: {
    select: {title: 'title', media: 'mainImage'},
  },
})
