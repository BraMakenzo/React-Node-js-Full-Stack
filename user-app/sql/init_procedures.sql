-- Create table if not exists
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    date_of_birth DATE,
    occupation VARCHAR(100),
    gender VARCHAR(20),
    date_added DATE
);

-- Create stored procedure to insert a user
CREATE OR REPLACE PROCEDURE insert_user_proc(
    p_name VARCHAR,
    p_dob DATE,
    p_occupation VARCHAR,
    p_gender VARCHAR,
    p_date_added DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO users (name, date_of_birth, occupation, gender, date_added)
    VALUES (p_name, p_dob, p_occupation, p_gender, p_date_added);
END;
$$;

-- Create function to return all John Smith records
CREATE OR REPLACE FUNCTION get_john_smith_fn()
RETURNS TABLE(
    id INT,
    name VARCHAR,
    date_of_birth DATE,
    occupation VARCHAR,
    gender VARCHAR,
    date_added DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT id, name, date_of_birth, occupation, gender, date_added
    FROM users
    WHERE name = 'John Smith';
END;
$$;
