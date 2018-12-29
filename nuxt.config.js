module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "Михайловские ряды - интернет-магазин православных икон и утвори",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "yandex-verification",
        content: "dc57b376f54cc382"
      },
      {
        name: "google-site-verification",
        content: "exPk0XYDFqeyLfSc0sRP-g7OCCGARfltaMKeLHgrMyU"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no"
      },
      {
        hid: "description",
        name: "description",
        content: "Купить или заказать онлайн иконы, православные подарки и сувениры в православном интернет-магазине Михайловские ряды с бесплатной доставкой по Харькову, Харьковской области, Киеву и Одессы, по всей Украине"
      },
      {
        hid: "keywords",
        name: "keywords",
        content: `Купить иконостасы, иконы, Спасителя, Иисус Христос, Богородица, сувениры, православные подарки`,
      }
    ],
    link: [{
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "stylesheet",
        href: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
        integrity: "sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm",
        crossorigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
      }
    ],
    script: [{
        src: "https://code.jquery.com/jquery-3.2.1.slim.min.js",
        integrity: "sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN",
        crossorigin: "anonymous"
      },
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
        integrity: "sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q",
        crossorigin: "anonymous"
      },
      {
        src: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js",
        integrity: "sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl",
        crossorigin: "anonymous"
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/css/main.css", "~/assets/css/theme.css", "~/assets/css/util.css",
    '~/node_modules/bootstrap/dist/css/bootstrap.min.css', '~/assets/css/main.scss', '~/assets/css/hamburgers.min.css',
    "~/node_modules/swiper/dist/css/swiper.css"
  ],

  plugins: ["~plugins/vee-validate", "~plugins/vuejs-filters.js", {src:"~plugins/swiper.js",ssr: false}],
  modules: [
    ['@nuxtjs/google-tag-manager', { id: 'GTM-KXK43LF',layer: 'dataLayer' }],
    // '@nuxtjs/sitemap'
   ],
  //  sitemap: {
  //   exclude: [
  //     '/orders',
  //     '/bucket',
  //     '/create/*',
  //   ]
  //  },

  /*
   ** Add axios globally
   */
  build: {
    vendor: ["axios", "vee-validate"],
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  // serverMiddleware: [
  //   { path: '/d/:id', handler: '~/api/redirect.js' },
  // ]
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'error',
        path: '*',
        component: resolve(__dirname, 'pages/404.html.vue')
      })
    }
  }
};