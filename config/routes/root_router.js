"use strict"

module.exports = (app) => {
  /**
   * Dependencies
   */

  const base = app.locals.base
  const express = require("express")
  const RootController = require(base + "/app/controllers/root_controller")(app)
  const UsersController = require(base + "/app/controllers/users_controller")(app)
  const CashflowsController = require(base + "/app/controllers/cashflows_controller")(app)

  /**
   * Initialize router.
   */

  const router = express.Router()

  /**
   * Routes
   */

  // GET /
  router.route("/")
    .get(RootController.index)

  // POST /users/:id
  router.route("/users/:id")
    .get(RootController.redirect_to_index)
    .post(UsersController.update)

  // POST /users/:id/cashflows
  router.route("/users/:id/cashflows")
    .get(RootController.redirect_to_index)
    .post(CashflowsController.create)

  // POST /cashflows/:id/delete
  router.route("/cashflows/:id/delete")
    .get(RootController.redirect_to_index)
    .post(CashflowsController.delete)

  /**
   * Export router.
   */

  return router
}
