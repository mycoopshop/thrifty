"use strict"

module.exports = (app) => {
  /**
   * Dependencies
   */

  const db = app.locals.db
  const RootModel = require("root-model")

  /**
   * Define model
   */

  class Cashflow extends RootModel {
    /**
     * Find a specific record.
     *
     * @example
     *
     * Cashflow.all_by_user_id(req.param.user_id)
     *
     * @static @method
     * @since 1.0.4
     * @param {Number} user_id - foreign key of a resource.
     * @returns {Cashflow|null} - Cashflow or null.
     * @public
     */

    static async all_by_user_id(user_id) {
      let results = await db.prepare("SELECT * FROM cashflows WHERE user_id = $user_id").all({user_id: user_id})

      for (let i=0; i < results.length; i++) {
        results[i] = new User(results[i])
      }

      return results
    }

    /**
     * Construct a model instance.
     *
     * @example
     *
     * let container = new User({}, req, res)
     *
     * @method
     * @since 1.0.4
     * @param {Object} param - instance key values.
     * @param {Object} req - Express Request object.
     * @param {Object} res - Express Response object.
     * @return {User}
     * @public
     */

    constructor(param, req, res) {
      super(req, res)
      this.strong_param(param)
    }

    /**
     * Assignment using strong parameters.
     *
     * @method
     * @since 1.0.4
     * @param {Object} param - instance key values.
     * @return {User}
     * @public
     */

    strong_param(param) {
      let assignment_err = this.assignment(param, {
        id: "string_or_number_or_null?",
        balance: "string_or_number_or_null?",
        currency: "string_or_number_or_null?"
      })

      if (assignment_err) {
        console.error("User#strong_param", assignment_err)
        this.errors.messages.push("Malformed model parameters.")
        this.errors.codes.push("malformed_model_param")
      }
    }
  }

  /**
   * Export model
   */

  return Cashflow
}
