CREATE TABLE orders_products (
    id SERIAL PRIMARY  KEY,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id),
    quantity integer,
    UNIQUE (order_id, product_id)
);