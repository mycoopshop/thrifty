"use strict"

/**
 * Dependencies
 */

const express = require("express")
const path = require("path")
const ejs = require("ejs")
const debug = require("debug")("app.js")

/**
 * Define app
 */

debug("Define app")
const app = express()

/**
 * Constants
 */

debug("Constants")
const title = "Thrifty"
const port = 53001
const base = path.join(__dirname, "..")
const env = process.env.NODE_ENV || "development"
const views = path.join(base, "/app/views")

/**
 * Locals
 */

debug("Locals")
app.locals.title = title
app.locals.port = port
app.locals.base = base
app.locals.env = env
app.locals.views = views
app.locals.db = require("./db")(app)
app.locals.currency_icon = require(base + "/app/helpers/currency_icon")

/**
 * Settings
 */

debug("Settings")
app.set("env", env)
app.disable("x-powered-by")
app.set("json spaces", 2)

/**
 * View engine
 */

debug("View engine")
app.engine("html.ejs", ejs.renderFile)
app.set("view engine", ".html.ejs")
app.set("views", views)

/**
 * Middleware
 */

debug("Mount middleware")
app.use(require(base + "/lib/middleware/parsers/json_body_parser"))
app.use(require(base + "/lib/middleware/parsers/urlencoded_body_parser"))

/**
 * Static assets
 */

debug("Mount static assets")
app.use("/assets", express.static(base + "/node_modules/jquery/dist"))
app.use("/assets", express.static(base + "/node_modules/popper.js/dist/umd"))
app.use("/assets", express.static(base + "/node_modules/font-awesome"))
app.use("/assets", express.static(base + "/node_modules/bootstrap/dist"))
app.use("/assets/js", express.static(base + "/node_modules/turbolinks/dist"))
app.use("/assets/js", express.static(base + "/node_modules/d3/build"))
app.use("/assets/js", express.static(base + "/app/assets/js"))

/**
 * Routes
 */

debug("Mount routes")
app.use("/", require("./routes/root_router")(app))
app.use("/cashflows", require("./routes/cashflows_router")(app))
app.use("/users", require("./routes/users_router")(app))

/**
 * Error handlers
 */

debug("Mount error handlers")
app.use(require(base + "/lib/middleware/errors/page_not_found"))
app.use(require(base + "/lib/middleware/errors/render_error"))

/**
 * Start server
 */

async function start_server() {
  /**
   * Initializers
   */

  await require("./initializers/migrations")(app)

  /**
   * Start listening for requests.
   */

  const server = app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
  })
  process.on("SIGINT", () => {
    console.log("Received a SIGINT signal")
    server.close(() => {
      app.locals.db.close()
    })
  })
  process.on("SIGTERM", () => {
    console.log("Received a SIGTERM signal")
    server.close(() => {
      app.locals.db.close()
    })
  })
}

if (module === require.main) {
  debug("Start server")
  start_server()
}

/**
 * Export app
 */

module.exports = app
