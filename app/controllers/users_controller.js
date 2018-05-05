"use strict"

module.exports = (app) => {
  /**
   * Dependencies
   */

  const base = app.locals.base
  const User = require(base + "/app/models/user")(app)

  /**
   * Define controller
   */

  class UsersController {
    /**
     * Update user.
     *
     * @static @method
     * @since 1.0.1
     * @public
     */

    static async update(req, res) {
      try {
        let user = await User.find_by_id(req.params.id)

        if (user) {
          user.strong_param(req.body)
          await user.update()
        }

        res.redirect("/")
      } catch(err) {
        console.error("UsersController#update", err)
        next(err)
      }
    }
  }

  /**
   * Export controller
   */

  return UsersController
}
