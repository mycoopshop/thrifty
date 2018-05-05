"use strict"

module.exports = async (db) => {
  console.log('migrations/20171104201130_create_cashflows.js')

  try {
    await db.query(`
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS cashflows (
  id integer PRIMARY KEY,
  amount integer DEFAULT 0,
  description text
);

COMMIT;
    `)
    return true
  } catch(err) {
    console.error(err)
    return false
  }
}
