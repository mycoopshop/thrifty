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
     * @since 1.0.1
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
     * @since 1.0.1
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
     * @since 1.0.1
     * @param {Object} param - instance key values.
     * @return {User}
     * @public
     */

    strong_param(param) {
      let assignment_err = this.assignment(param, {
        id: "string_or_number_or_null?",
        balance: "string_or_number_or_null?",
        currency: "string_or_number_or_null?",
        modified_at: "date_or_string_or_null?",
        created_at: "date_or_string_or_null?"
      })

      if (assignment_err) {
        console.error("User#strong_param", assignment_err)
        this.errors.messages.push("Malformed model parameters.")
        this.errors.codes.push("malformed_model_param")
      }
    }

    /**
     * Update a database record.
     *
     * @example
     *
     * user.strong_param(req.body)
     * await user.update()
     *
     * @method
     * @since 1.0.1
     * @return {User|null} - a User or null.
     * @public
     */

    async update() {
      if (this.errors.count === 0 && await this.is_valid()) {

        let results = await db.prepare(`
          UPDATE users
          SET
            balance = $balance,
            modified_at = datetime('now')
          WHERE id = $id
        `).run({
          id: this.id,
          balance: this.balance
        })

        return true
      } else {
        throw Error(this.errors.codes)
      }
    }

    /**
     * Validates the model adding errors as they are found.
     *
     * @method
     * @since 1.0.1
     * @private
     */

    async validate() {
      return true
    }
  }

  /**
   * Export model
   */

  return User
}
