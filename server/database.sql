CREATE DATABASE projectrevive;

-- \c into projectrevive

CREATE TABLE habits(
    habit_id SERIAL PRIMARY KEY,
    title VARCHAR(15)
)