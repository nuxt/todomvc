module.exports = {
  head: {
    title: 'TodoMVC made with Nuxt.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: 'TodoMVC project made with Nuxt.js.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  css: [
    { src: 'todomvc-app-css/index.css' }
  ],
  router: {
    linkActiveClass: 'selected'
  }
}
