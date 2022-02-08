CREATE TABLE order_videogame (
	id SERIAL PRIMARY KEY,
	quantity INTEGER,
	order_id bigint REFERENCES orders (id),
	game_id bigint REFERENCES videogames (id)
);

/*store_user_id INTEGER REFERENCES storeusers (id) */