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
   * Run any pending migrations (production)
   */

  let schema_migrations = new SchemaMigrations(base, db, false)

  try {
    await schema_migrations.run()
  } catch(err) {
    console.error(err)
  }

  return true
}
