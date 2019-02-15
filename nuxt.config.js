module.exports = {
  /*
  ** Auth middleware globally setting.
  */
  router: {
    middleware: ['auth'],
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'quwi',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],
  /*
  ** Auth. general options shared with all strategies
  */
  auth: {
    plugins: ['~/plugins/auth.js'],
    resetOnError: true,
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/projects',
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/users/profile', method: 'get', propertyName: 'user' },
        },
      },
    },
  },
  /*
  ** Setting axios `baseURL`
  */
  axios: {
    baseURL: `https://api.quwi.com/v2/`,
  },

  ssr: false,

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
