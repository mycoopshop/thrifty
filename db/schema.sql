BEGIN TRANSACTION;

/*
  Schema migrations
*/

CREATE TABLE IF NOT EXISTS schema_migrations (
  version numeric PRIMARY KEY
);

/*
  Financial management
*/

CREATE TABLE IF NOT EXISTS users (
  id integer PRIMARY KEY,
  balance integer DEFAULT 0,
  currency integer DEFAULT 0,
  modified_at datetime DEFAULT CURRENT_TIMESTAMP,
  created_at datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cashflows (
  id integer PRIMARY KEY,
  user_id integer NOT NULL,
  amount integer DEFAULT 0,
  description text,
  modified_at datetime DEFAULT CURRENT_TIMESTAMP,
  created_at datetime DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
