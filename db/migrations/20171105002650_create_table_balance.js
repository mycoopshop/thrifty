'use strict'

module.exports = (app) => {
  app.locals.db.serialize(() => {
    app.locals.db.run(`
CREATE TABLE users (
  id integer UNIQUE,
  balance integer DEFAULT 0,
  currency integer DEFAULT 0
);`)

    app.locals.db.run('INSERT INTO users (id, balance, currency) VALUES (0, 0, 0);')
  })
}
