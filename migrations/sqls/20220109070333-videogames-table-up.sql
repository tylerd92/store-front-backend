CREATE TABLE videogames (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50),
  genre VARCHAR(50),
  price DECIMAL,
  summary TEXT
);