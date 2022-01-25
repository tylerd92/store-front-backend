/* Replace with your SQL commands */
CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	order_status VARCHAR(30) NULL,
  store_user_id INTEGER REFERENCES storeusers (id)
);