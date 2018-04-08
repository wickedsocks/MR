module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "MRVueJS",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, user-scalable=no" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
        integrity:
          "sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm",
        crossorigin: "anonymous"
      }
    ]
  },
  /*
  ** Global CSS
  */
  css: ["~/assets/css/main.css"],
  
  plugins: [ '~plugins/vee-validate', '~plugins/vuejs-filters.js'],

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
  }
};
