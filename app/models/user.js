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

  class User extends RootModel {
    /**
     * Find a specific record.
     *
     * @example
     *
     * User.find_by_id(req.param.id)
     *
     * @static @method
     * @since 1.0.4
     * @param {Number} id - primary key of a resource.
     * @returns {User|null} - User or null.
     * @public
     */

    static async find_by_id(id) {
      let results = await db.prepare("SELECT * FROM users WHERE id = $id LIMIT 1").get({id: id})

      if (results) {
        return new User(results)
      } else {
        return null
      }
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

  return User
}
