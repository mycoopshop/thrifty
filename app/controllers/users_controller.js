"use strict"

module.exports = (app) => {
  /**
   * Define controller
   */

  class UsersController {
    /**
     * Render index page.
     *
     * @static @method
     * @since 1.0.4
     * @public
     */

    static index(req, res) {
      // app.post("/users", (req, res) => {
      //   req.app.locals.db.run(`
      //     UPDATE users SET
      //     balance=${req.body.balance},
      //     currency=${req.body.currency}
      //     WHERE id=0;`, () =>  {
      //     res.redirect("/")
      //   })
      // })

      res.render("index")
    }
  }

  /**
   * Export controller
   */

  return UsersController
}
