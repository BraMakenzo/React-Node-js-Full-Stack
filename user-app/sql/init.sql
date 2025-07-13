CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    date_of_birth DATE,
    occupation VARCHAR(100),
    gender VARCHAR(20),
    date_added DATE
);
