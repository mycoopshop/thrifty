"use strict"

module.exports = (app) => {
  /**
   * Dependencies
   */

  const base = app.locals.base
  const express = require("express")
  const CashflowsController = require(base + "/app/controllers/cashflows_controller")(app)

  /**
   * Initialize router.
   */

  const router = express.Router()

  /**
   * Routes
   */

  router.route("/")
    .get(CashflowsController.index)
  // app.post("/cashflows", (req, res) => {
  //   if (req.body.constructor === Object) {
  //     let keys = Object.keys(req.body)
  //     if (keys.includes("amount") && keys.includes("description")) {
  //       req.app.locals.db.run(`
  //         INSERT INTO cashflows (
  //           amount,
  //           description
  //         ) VALUES (?, ?);
  //       `, [req.body.amount, req.body.description], () => {
  //         res.redirect("/")
  //       })
  //     } else {
  //       res.sendStatus(400)
  //     }
  //   } else {
  //     res.sendStatus(400)
  //   }
  // })
  // app.delete("/cashflows/:id", (req, res) => {
  //   req.app.locals.db.run(`DELETE FROM cashflows WHERE id=${req.params.id};`, () => {
  //     res.redirect("/")
  //   })
  // })

  /**
   * Export router.
   */

  return router
}
