'use strict'

module.exports = (app) => {
  app.locals.db.run(`
CREATE TABLE cashflows (
  id integer PRIMARY KEY AUTOINCREMENT,
  amount integer,
  description text
);
  `)
}
