BEGIN TRANSACTION;

/*
  Schema migrations
*/

CREATE TABLE IF NOT EXISTS schema_migrations (
  version integer PRIMARY KEY
);

/*
  Financial management
*/

CREATE TABLE IF NOT EXISTS users (
  id integer PRIMARY KEY,
  balance integer DEFAULT 0,
  currency integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS cashflows (
  id integer PRIMARY KEY,
  user_id integer NOT NULL,
  amount integer DEFAULT 0,
  description text
);

COMMIT;
