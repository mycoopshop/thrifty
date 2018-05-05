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

  class RootController {
    /**
     * Render index page.
     *
     * @static @method
     * @since 1.0.4
     * @public
     */

    static async index(req, res) {
      try {
        let user = await User.find_by_id(0)
        let cashflows = await Cashflow.all_by_user_id(0)

        let total_inflow = 0
        let total_outflow = 0
        let netflow = 0
        let months_left = 3

        for (let i=0; i < cashflows.length; i++) {
          if (cashflows[i].amount > 0 ) {
            netflow += cashflows[i].amount
            total_inflow += cashflows[i].amount
          } else {
            netflow += cashflows[i].amount
            total_outflow += cashflows[i].amount
          }
        }

        months_left = Math.round(user.balance / Math.abs(total_outflow))

        res.render("index", {
          user: user,
          cashflows: cashflows,
          total_inflow: total_inflow,
          total_outflow: total_outflow,
          netflow: netflow,
          months_left: months_left
        })
      } catch(err) {
        console.error("RootController#index", err)
        next(err)
      }
    }
  }

  /**
   * Export controller
   */

  return RootController
}
