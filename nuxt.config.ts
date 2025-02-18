// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Cambodia Address Detector',
    },
    rootAttrs: {
      class: 'h-100'
    }
  },
  css: [
    '~/assets/scss/main.scss',
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  plugins: [
    '~/plugins/vuetify.ts',
  ],
  vite: {
    plugins: [
      vuetify()
    ]
  },
  modules: [
    '@pinia/nuxt',
  ],
});
