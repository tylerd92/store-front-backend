CREATE TABLE storeusers (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  user_password VARCHAR(100),
  email VARCHAR(50)
);