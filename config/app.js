'use strict'

/**
 * Dependencies
 */

const express = require('express')
const path = require('path')
const ejs = require('ejs')

/**
 * Initialize app
 */

const app = express()

/**
 * Constants
 */

const title = "Thrifty"
const port = 53001
const base = path.join(__dirname, '..')
const env = process.env.NODE_ENV || 'development'
const views = path.join(base, '/app/views')

/**
 * Locals
 */

app.locals.title = title
app.locals.port = port
app.locals.base = base
app.locals.env = env
app.locals.views = views
app.locals.db = require('./db')(app)

/**
 * Settings
 */

app.set('env', env)
app.disable('x-powered-by')

/**
 * View engine
 */

app.engine('html.ejs', ejs.renderFile)
app.set('view engine', '.html.ejs')
app.set('views', views)

/**
 * Static assets
 */

app.use('/assets', express.static(base + '/node_modules/jquery/dist'))
app.use('/assets', express.static(base + '/node_modules/popper.js/dist/umd'))
app.use('/assets', express.static(base + '/node_modules/font-awesome'))
app.use('/assets', express.static(base + '/node_modules/bootstrap/dist'))
app.use('/assets/js', express.static(base + '/node_modules/turbolinks/dist'))

/**
 * Initializers
 */

require(base + '/config/initializers/migrations')(app)

/**
 * Middleware
 */

app.use(require(base + '/lib/middleware/json_body_parser'))
app.use(require(base + '/lib/middleware/urlencoded_body_parser'))

/**
 * Routes
 */

app.get('/', (req, res) => {
  // read all cashflows
  res.render('hello')
})
app.post('/cashflows', (req, res) => {
  // create cashflow
  res.redirect('/')
})
app.delete('/cashflows/:id', (req, res) => {
  // remove cashflow
  res.redirect('/')
})

/**
 * Error handlers
 */

app.use(require(base + '/lib/middleware/page_not_found'))
app.use(require(base + '/lib/middleware/render_error'))

/**
 * Start server
 */

if (module === require.main) {
  app.listen(port, () => {
    console.log(`Running express.js app on port ${port}`)
  })
}

/**
 * Export app
 */

module.exports = app
