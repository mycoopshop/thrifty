"use strict"

module.exports = async (app) => {
  /**
   * Dependencies
   */

  const SchemaMigrations = require("schema-migrations")

  /**
   * Constants
   */

  const base = app.locals.base
  const db = app.locals.db

  /**
   * Configure schema migrations.
   */

  let config = {
    type: "sqlite",
    close: false
  }

  /**
   * Run all pending migrations.
   */

  let schema_migrations = new SchemaMigrations(base, db, config)

  try {
    await schema_migrations.run()
  } catch(err) {
    console.error(err)
  }

  return true
}
