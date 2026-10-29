import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'vf8onmew',
    dataset: 'production'
  },
  studioHost: 'forresterkarr', // https://forresterkarr.sanity.studio
  deployment: {
    appId: 'xpuv38idf1yerhd5a2ftlmfr',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
