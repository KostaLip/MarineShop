CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	password_hash VARCHAR(255) NOT NULL,
	phone VARCHAR(255),
	is_admin BOOLEAN DEFAULT false,
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
	category_id SERIAL PRIMARY KEY,
	category_name VARCHAR(100) NOT NULL,
	description TEXT,
	icon_name VARCHAR(100)
);

CREATE TABLE products (
	product_id SERIAL PRIMARY KEY,
	category_id INTEGER REFERENCES categories(category_id),
	product_name VARCHAR(100),
	description TEXT,
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INTEGER NOT NULL DEFAULT 0,
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_images (
	product_image_id SERIAL PRIMARY KEY,
	product_id INTEGER REFERENCES products(product_id),
	image_url VARCHAR(255) NOT NULL
);

CREATE TABLE carts (
	cart_id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE cart_items (
	cart_item_id SERIAL PRIMARY KEY,
	cart_id INTEGER REFERENCES carts(cart_id),
	product_id INTEGER REFERENCES products(product_id),
	quantity INTEGER NOT NULL CHECK (quantity > 0)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    total_price DECIMAL(10, 2) NOT NULL,
    shipping_country VARCHAR(100),
    shipping_city VARCHAR(100), 
    shipping_address VARCHAR(255),
    stripe_session_id VARCHAR(255)
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE reviews (
	review_id SERIAL PRIMARY KEY,
	product_id INTEGER REFERENCES products(product_id),
	user_id INTEGER REFERENCES users(user_id),
	rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
	review_comment TEXT,
	date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);