CREATE TABLE schema_migrations (
  version text UNIQUE ON CONFLICT IGNORE
);

CREATE TABLE cashflows (
  id integer PRIMARY KEY AUTOINCREMENT,
  amount integer DEFAULT 0,
  description text
);

CREATE TABLE balance (
  amount integer DEFAULT 0
);
