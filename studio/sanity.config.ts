import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure, SINGLETONS} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Forrester Karr Woodworking',

  projectId: 'vf8onmew',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Keep singletons out of the "new document" menu
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETONS.includes(schemaType)),
  },

  document: {
    // No duplicate/delete for singletons
    actions: (actions, {schemaType}) =>
      SINGLETONS.includes(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
