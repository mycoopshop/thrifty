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
      // app.post("/cashflows", (req, res) => {
      //   if (req.body.constructor === Object) {
      //     let keys = Object.keys(req.body)
      //     if (keys.includes("amount") && keys.includes("description")) {
      //       req.app.locals.db.run(`
      //         INSERT INTO cashflows (
      //           amount,
      //           description
      //         ) VALUES (?, ?);
      //       `, [req.body.amount, req.body.description], () => {
      //         res.redirect("/")
      //       })
      //     } else {
      //       res.sendStatus(400)
      //     }
      //   } else {
      //     res.sendStatus(400)
      //   }
      // })
      // app.delete("/cashflows/:id", (req, res) => {
      //   req.app.locals.db.run(`DELETE FROM cashflows WHERE id=${req.params.id};`, () => {
      //     res.redirect("/")
      //   })
      // })

      res.render("index")
    }
  }

  /**
   * Export controller
   */

  return CashflowsController
}
