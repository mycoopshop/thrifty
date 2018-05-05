"use strict"

module.exports = (app) => {
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
        let cashflow = new Cashflow(req.body)
        await cashflow.create()

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
