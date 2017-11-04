'use strict'

/**
 * Dependencies
 */

const express = require('express')
const path = require('path')

/**
 * Initialize app
 */

const app = express()

/**
 * Constants
 */

const port = 53001

/**
 * Middleware
 */

app.use(express.static(path.join(__dirname, '/../app/views')))

/**
 * Routes
 */

app.get('/', (req, res) => {
  res.render('hello')
})

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
