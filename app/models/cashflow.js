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
     * @since 1.0.1
     * @param {Number} user_id - foreign key of a resource.
     * @returns {Cashflow|null} - Cashflow or null.
     * @public
     */

    static async all_by_user_id(user_id) {
      let results = await db.prepare("SELECT * FROM cashflows WHERE user_id = $user_id").all({user_id: user_id})

      for (let i=0; i < results.length; i++) {
        results[i] = new Cashflow(results[i])
      }

      return results
    }

    /**
     * Delete a record.
     *
     * @example
     *
     * Cashflow.delete(req.params.id)
     *
     * @static @method
     * @since 1.0.1
     * @param {Number} id - primary key of a resource.
     * @public
     */

    static async delete(id) {
      await db.prepare("DELETE FROM cashflows WHERE id = $id").run({id: id})
    }

    /**
     * Construct a model instance.
     *
     * @example
     *
     * let container = new Cashflow({}, req, res)
     *
     * @method
     * @since 1.0.1
     * @param {Object} param - instance key values.
     * @param {Object} req - Express Request object.
     * @param {Object} res - Express Response object.
     * @return {Cashflow}
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
        user_id: "string_or_number_or_null?",
        amount: "string_or_number_or_null?",
        description: "string_or_null?",
        modified_at: "date_or_string_or_null?",
        created_at: "date_or_string_or_null?"
      })

      if (assignment_err) {
        console.error("Cashflow#strong_param", assignment_err)
        this.errors.messages.push("Malformed model parameters.")
        this.errors.codes.push("malformed_model_param")
      }
    }

    /**
     * Create a database record.
     *
     * @example
     *
     * let cashflow = new Cashflow(req.body)
     * await cashflows.create()
     *
     * @method
     * @since 1.0.1
     * @return {Cashflow|null} - a Cashflow or null.
     * @public
     */

    async create() {
      if (this.errors.count === 0 && await this.is_valid()) {
        let results = await db.prepare(`
          INSERT INTO cashflows (
            user_id,
            amount,
            description
          ) VALUES (
            $user_id,
            $amount,
            $description
          )
        `).run({
          user_id: this.user_id,
          amount: this.amount,
          description: this.description
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

  return Cashflow
}
