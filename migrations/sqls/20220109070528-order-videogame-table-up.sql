CREATE TABLE order_videogame (
	id SERIAL PRIMARY KEY,
	quantity INTEGER,
	order_id INTEGER REFERENCES orders (id),
	game_id INTEGER REFERENCES videogames (id)
);

/*store_user_id INTEGER REFERENCES storeusers (id) */