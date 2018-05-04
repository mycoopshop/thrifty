"use strict"

module.exports = (app) => {
  /**
   * Define controller
   */

  class CashflowsController {
    /**
     * Render index page.
     *
     * @static @method
     * @since 1.0.4
     * @public
     */

    static index(req, res) {
      res.render("index")
    }
  }

  /**
   * Export controller
   */

  return CashflowsController
}
