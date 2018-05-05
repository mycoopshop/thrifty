"use strict"

module.exports = (app) => {
  /**
   * Dependencies
   */

  const base = app.locals.base
  const express = require("express")
  const UsersController = require(base + "/app/controllers/users_controller")(app)

  /**
   * Initialize router.
   */

  const router = express.Router()

  /**
   * Routes
   */

  router.route("/")
    .get(UsersController.index)

  /**
   * Export router.
   */

  return router
}
