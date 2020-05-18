DROP TABLE IF EXISTS memory;

CREATE TABLE memory(
  id SERIAL PRIMARY KEY,
  year INT,
  month INT,
  day INT,
  username TEXT,
  message TEXT,
  is_deleted INT DEFAULT 0
);
