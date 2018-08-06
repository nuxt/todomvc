const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()
const { Nuxt, Builder } = require('nuxt')

// Body parser, to access req.body
app.use(bodyParser.json())

// Sessions to create req.session
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

app.put('/api/todos', function (req, res) {
  req.session.todos = req.body.todos
  res.json(req.session.todos)
})

// We instantiate Nuxt.js with the options
const isProd = process.env.NODE_ENV === 'production'
let config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)
// No build in production
const promise = (isProd ? Promise.resolve() : new Builder(nuxt).build())
promise.then(() => {
  app.use(nuxt.render)
  app.listen(3000)
  console.log('Server is listening on http://localhost:3000')  // eslint-disable-line no-console
})
.catch((error) => {
  console.error(error)  // eslint-disable-line no-console
  process.exit(1)
})
