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

  /**
   * Export router.
   */

  return router
}
