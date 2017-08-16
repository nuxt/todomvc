import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import api from './api'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

const session = require('express-session')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  cookie: ('name', 'value', { path: '/', httpOnly: true,secure: false, maxAge:  60000 }),
  resave: true,
  saveUninitialized: true,

}))
app.put('/api/todos', function (req, res) {
  req.session.todos = req.body.todos
  res.json(req.session.todos)
})

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
