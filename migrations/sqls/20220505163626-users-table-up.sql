CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR,
    lastName VARCHAR,
    email VARCHAR,
    password VARCHAR,
    CONSTRAINT email_unique UNIQUE (email)
);