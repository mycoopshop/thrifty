CREATE TABLE schema_migrations (
  version text UNIQUE ON CONFLICT IGNORE
);

CREATE TABLE cashflows (
  id integer PRIMARY KEY AUTOINCREMENT,
  amount integer DEFAULT 0,
  description text
);

CREATE TABLE users (
  id integer UNIQUE,
  balance integer DEFAULT 0,
  currency integer DEFAULT 0
);
