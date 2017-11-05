'use strict'

module.exports = (app) => {
  app.locals.db.run(`
CREATE TABLE balance (
  amount integer DEFAULT 0
);
  `)
}
