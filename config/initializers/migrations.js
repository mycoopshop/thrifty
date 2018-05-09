"use strict"

module.exports = async (app) => {
  /**
   * Dependencies
   */

  const base = app.locals.base
  const db = app.locals.db
  const SchemaMigrations = require("schema-migrations")

  /**
   * Run pending migrations.
   */

  let schema_migrations = new SchemaMigrations(base, db, "sqlite")

  try {
    await schema_migrations.run()
  } catch(err) {
    console.error(err)
  }

  return true
}
