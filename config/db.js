'use strict'

const sqlite3 = require('sqlite3')
const path = require('path')

module.exports = (app) => {
  const db_path = path.join(app.locals.base, '/db/development.sqlite3')
  const db = new sqlite3.Database(db_path)
  return db
}
