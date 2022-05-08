DROP TYPE IF EXISTS mood;
CREATE TYPE mood AS ENUM ('active', 'complete');
CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    user_id bigint REFERENCES users(id),
    status mood DEFAULT 'active'
);