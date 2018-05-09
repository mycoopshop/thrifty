"use strict"

module.exports = async (app) => {
  /**
   * Dependencies
   */

  const base = app.locals.base
  const db = app.locals.db
  const fs = require("fs")
  const path = require("path")

  /**
   * Constants
   */

  const seed_sql_path = path.join(base, "db", "seed.sql")

  /**
   * Run any pending migrations.
   */

  try {
    if (fs.existsSync(seed_sql_path)) {
      let sql = fs.readFileSync(seed_sql_path, "utf8")
      await db.query(sql)
    }
  } catch(err) {
    // Do nothing
  }

  return true
}
