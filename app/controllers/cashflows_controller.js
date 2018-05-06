"use strict"

module.exports = (app) => {
  /**
   * Dependencies
   */

  const base = app.locals.base
  const User = require(base + "/app/models/user")(app)
  const Cashflow = require(base + "/app/models/cashflow")(app)

  /**
   * Define controller
   */

  class CashflowsController {
    /**
     * Create cashflow.
     *
     * @static @method
     * @since 1.0.1
     * @public
     */

    static async create(req, res) {
      try {
        let user = await User.find_by_id(req.body)

        if (user) {
          let cashflow = new Cashflow(req.body)
          await cashflow.create()
        }

        res.redirect("/")
      } catch(err) {
        console.error("CashflowsController#create", err)
        next(err)
      }
    }
    /**
     * Delete cashflow.
     *
     * @static @method
     * @since 1.0.1
     * @public
     */

    static async delete(req, res) {
      try {
        await Cashflow.delete(req.params.id)

        res.redirect("/")
      } catch(err) {
        console.error("CashflowsController#delete", err)
        next(err)
      }
    }
  }

  /**
   * Export controller
   */

  return CashflowsController
}
