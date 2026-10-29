import type {StructureResolver} from 'sanity/structure'
import {CogIcon} from '@sanity/icons/Cog'

export const SINGLETONS = ['siteSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => !SINGLETONS.includes(item.getId() as string)),
    ])
