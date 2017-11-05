'use strict'

module.exports = (app) => {
  app.locals.db.serialize(() => {
    app.locals.db.run(`
CREATE TABLE balance (
  id integer UNIQUE,
  amount integer DEFAULT 0
);`)

    app.locals.db.run('INSERT INTO balance (id, amount) VALUES (0, 0);')
  })
}
