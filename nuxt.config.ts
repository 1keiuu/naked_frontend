// const envPath = `.env.${process.env.NODE_ENV}`
// require('dotenv').config({ path: envPath})

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  server: {
    port: 4000
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'NAKED',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [{ src: '~/assets/scss/global.scss', lang: 'scss' }],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/composition-api'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true,
  },
  proxy: { "/api": { target: process.env.API_BASE_URL || 'http://localhost:3000' } },
  publicRuntimeConfig: {

  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config:any, isDev:boolean, isClient:boolean ) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|ts|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  },

  auth: {
    redirect: {
      login: '/logIn',
      logout: '/logIn',
      callback: false,
      home: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/v1/users/login',
            method: 'post',
            propertyName: 'token',
          },
          user: { url: 'api/v1/users/current_user', method: 'get' },
          logout: false,
        },
        // TODO: autoFetchにしたい
        // token: {
        //   property: 'token',
        //   // required: true,
        //   // type: 'Bearer'
        // },
        // user: {
        //   property: 'user',
        // },
      },
    },
  },
  router: {
    middleware: 'auth',
  },

}

