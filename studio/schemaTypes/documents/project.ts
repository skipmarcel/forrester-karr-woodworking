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
      type: 'array',
      description: 'Wood, finish and scope of the project. To add a link, select the words and click the link icon.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) => rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel']}),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
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
