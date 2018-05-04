"use strict"

module.exports = (app) => {
  /**
   * Dependencies
   */

  const base = app.locals.base
  const express = require("express")
  const RootController = require(base + "/app/controllers/root_controller")(app)

  /**
   * Initialize router.
   */

  const router = express.Router()

  /**
   * Routes
   */

  router.route("/")
    .get(RootController.index)
  // app.get("/", (req, res, next) => {
  //   req.app.locals.db.get("SELECT balance,currency FROM users WHERE id=0;", (err, row) => {
  //     req.app.locals.db.all("SELECT id, amount, description FROM cashflows;", (err, rows) => {
  //       if (err) { next(err) }
  //       let currency = row.currency
  //       let balance = row.balance
  //       let total_inflow = 0
  //       let total_outflow = 0
  //       let netflow = 0
  //       let months_left = 3
  //       for (let i=0; i<rows.length; i++) {
  //         if (rows[i].amount > 0 ) {
  //           netflow += rows[i].amount
  //           total_inflow += rows[i].amount
  //         } else {
  //           netflow += rows[i].amount
  //           total_outflow += rows[i].amount
  //         }
  //       }
  //       months_left = Math.round(balance / Math.abs(total_outflow))
  //       res.render("hello", {
  //         currency: currency,
  //         balance: balance,
  //         cashflows: rows,
  //         total_inflow: total_inflow,
  //         total_outflow: total_outflow,
  //         netflow: netflow,
  //         months_left: months_left
  //       })
  //     })
  //   })
  // })

  /**
   * Export router.
   */

  return router
}
