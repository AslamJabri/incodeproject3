CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(15) NOT NULL,
    lastname  VARCHAR(15) NOT NULL,
    email   VARCHAR(50) UNIQUE,
    password VARCHAR(120) NOT NULL
);
DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
    schedule_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    day SMALLINT CHECK (day BETWEEN 1 AND 7) NOT NULL,
    start_at TIME NOT NULL,
    end_at TIME NOT NULL
);