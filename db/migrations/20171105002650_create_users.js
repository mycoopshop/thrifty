"use strict"

module.exports = async (db) => {
  console.log('migrations/20171105002650_create_users.js')

  try {
    await db.query(`
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS users (
  id integer PRIMARY KEY,
  balance integer DEFAULT 0,
  currency integer DEFAULT 0
);

COMMIT;
    `)
    return true
  } catch(err) {
    console.error(err)
    return false
  }
}
