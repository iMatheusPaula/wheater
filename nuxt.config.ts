// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app:{
    head: {
      script: [{
        src: 'https://kit.fontawesome.com/7c8801c017.js', crossorigin: 'anonymous'
      }]
    }
  },
  runtimeConfig: {
    public: {API_KEY: process.env.API_KEY}
  },
  modules: ["@nuxt/image"]
})