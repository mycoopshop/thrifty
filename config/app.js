"use strict"

/**
 * Dependencies
 */

const express = require("express")
const path = require("path")
const ejs = require("ejs")

/**
 * Initialize app
 */

const app = express()

/**
 * Constants
 */

const title = "Thrifty"
const port = 53001
const base = path.join(__dirname, "..")
const env = process.env.NODE_ENV || "development"
const views = path.join(base, "/app/views")

/**
 * Locals
 */

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

app.set("env", env)
app.disable("x-powered-by")

/**
 * View engine
 */

app.engine("html.ejs", ejs.renderFile)
app.set("view engine", ".html.ejs")
app.set("views", views)

/**
 * Static assets
 */

app.use("/assets", express.static(base + "/node_modules/jquery/dist"))
app.use("/assets", express.static(base + "/node_modules/popper.js/dist/umd"))
app.use("/assets", express.static(base + "/node_modules/font-awesome"))
app.use("/assets", express.static(base + "/node_modules/bootstrap/dist"))
app.use("/assets/js", express.static(base + "/node_modules/turbolinks/dist"))
app.use("/assets/js", express.static(base + "/node_modules/d3/build"))
app.use("/assets/js", express.static(base + "/app/assets/js"))

/**
 * Initializers
 */

require(base + "/config/initializers/migrations")(app)

/**
 * Middleware
 */

app.use(require(base + "/lib/middleware/json_body_parser"))
app.use(require(base + "/lib/middleware/urlencoded_body_parser"))

/**
 * Routes
 */

app.get("/", (req, res, next) => {
  req.app.locals.db.get("SELECT balance,currency FROM users WHERE id=0;", (err, row) => {
    req.app.locals.db.all("SELECT id, amount, description FROM cashflows;", (err, rows) => {
      if (err) { next(err) }
      let currency = row.currency
      let balance = row.balance
      let total_inflow = 0
      let total_outflow = 0
      let netflow = 0
      let months_left = 3
      for (let i=0; i<rows.length; i++) {
        if (rows[i].amount > 0 ) {
          netflow += rows[i].amount
          total_inflow += rows[i].amount
        } else {
          netflow += rows[i].amount
          total_outflow += rows[i].amount
        }
      }
      months_left = Math.round(balance / Math.abs(total_outflow))
      res.render("hello", {
        currency: currency,
        balance: balance,
        cashflows: rows,
        total_inflow: total_inflow,
        total_outflow: total_outflow,
        netflow: netflow,
        months_left: months_left
      })
    })
  })
})
app.post("/cashflows", (req, res) => {
  if (req.body.constructor === Object) {
    let keys = Object.keys(req.body)
    if (keys.includes("amount") && keys.includes("description")) {
      req.app.locals.db.run(`
        INSERT INTO cashflows (
          amount,
          description
        ) VALUES (?, ?);
      `, [req.body.amount, req.body.description], () => {
        res.redirect("/")
      })
    } else {
      res.sendStatus(400)
    }
  } else {
    res.sendStatus(400)
  }
})
app.delete("/cashflows/:id", (req, res) => {
  req.app.locals.db.run(`DELETE FROM cashflows WHERE id=${req.params.id};`, () => {
    res.redirect("/")
  })
})
app.post("/users", (req, res) => {
  req.app.locals.db.run(`
    UPDATE users SET
    balance=${req.body.balance},
    currency=${req.body.currency}
    WHERE id=0;`, () =>  {
    res.redirect("/")
  })
})

/**
 * Error handlers
 */

app.use(require(base + "/lib/middleware/page_not_found"))
app.use(require(base + "/lib/middleware/render_error"))

/**
 * Start server
 */

if (module === require.main) {
  const server = app.listen(port, () => {
    console.log(`Running express.js app on port ${port}`)
  })
  process.on("SIGINT", () => {
    server.close(() => {
      app.locals.db.close()
    })
  })
  process.on("SIGTERM", () => {
    server.close(() => {
      app.locals.db.close()
    })
  })
}

/**
 * Export app
 */

module.exports = app
