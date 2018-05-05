"use strict"

module.exports = (app) => {
  /**
   * Dependencies
   */

  const base = app.locals.base
  const Database = require("better-sqlite3")
  const path = require("path")

  /**
   * Constants
   */

  const db = {}
  const db_path = path.join(base, "db", "development.sqlite3")
  const config = {
    memory: false,
    readonly: false
  }

  /**
   * Initialize the database.
   */

  const sqlite_db = new Database(db_path, config)

  /**
   * Define the database interface.
   */

  db.query = (text) => {
    return sqlite_db.exec(text)
  }

  db.prepare = (text) => {
    return sqlite_db.prepare(text)
  }

  db.pragma = (text, simplify=true) => {
    return sqlite_db.pragma(text, simplify)
  }

  db.close = () => {
    return sqlite_db.close()
  }

  /**
   * Exports db interface.
   */

  return db
}
