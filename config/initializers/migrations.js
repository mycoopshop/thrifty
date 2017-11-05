'use strict'

const path = require('path')
const fs = require('fs')

module.exports = (app) => {
  const create_table_schema_migrations = `
CREATE TABLE IF NOT EXISTS schema_migrations (
  version text UNIQUE ON CONFLICT IGNORE
);
  `

  app.locals.db.exec(create_table_schema_migrations, () => {
    app.locals.db.all("SELECT version FROM schema_migrations;", (err, rows) => {
      let migrations = []
      let version

      for (let i=0; i < rows.length; i++) { migrations[i] = rows[i].version }

      let files = fs.readdirSync(path.join(app.locals.base, '/db/migrations'))
      for (let i=0; i < files.length; i++) {
        if (/\d+/.test(files[i])) {
          version = files[i].match(/\d+/)[0]
          if (!migrations.includes(version)) {
            require(path.join(app.locals.base, '/db/migrations/', files[i]))(app)
            app.locals.db.run("INSERT INTO schema_migrations VALUES (?)", version)
          }
        }
      }
    })
  })
}
