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
  // app.post("/users", (req, res) => {
  //   req.app.locals.db.run(`
  //     UPDATE users SET
  //     balance=${req.body.balance},
  //     currency=${req.body.currency}
  //     WHERE id=0;`, () =>  {
  //     res.redirect("/")
  //   })
  // })

  /**
   * Export router.
   */

  return router
}
