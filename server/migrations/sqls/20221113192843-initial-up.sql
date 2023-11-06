/* Replace with your SQL commands */
-- Drop the existing tables if they exist
DROP TABLE IF EXISTS volunteering, users, orgs;

-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp
);

-- Create the orgs table
CREATE TABLE orgs (
    org_id SERIAL PRIMARY KEY,
    org_name VARCHAR(100) NOT NULL,
    headquarters VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    admin_email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT current_timestamp
);

-- Create the volunteering table with foreign keys
CREATE TABLE volunteering (
    volunteering_id SERIAL PRIMARY KEY,
    org_id INT REFERENCES orgs(org_id),
    user_id INT REFERENCES users(user_id),
    volunteering_type VARCHAR(100) NOT NULL,
    volunteering_description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL

);

-- Insert data into the users table
INSERT INTO users (first_name, last_name, username, email, password)
VALUES
    ('John', 'Doe', 'johndoe', 'john@example.com', 'password123'),
    ('Alice', 'Smith', 'alicesmith', 'alice@example.com', 'securepwd'),
    ('Bob', 'Johnson', 'bobjohnson', 'bob@example.com', 'secret123'),
    ('Eve', 'Williams', 'evewilliams', 'eve@example.com', 'password456');

-- Insert data into the orgs table
INSERT INTO orgs (org_name, headquarters, phone, admin_email)
VALUES
    ('Local Volunteers', 'City Center', '+1234567890', 'admin@localvolunteers.org'),
    ('Food Bank', 'Downtown', '+9876543210', 'admin@foodbank.org'),
    ('Environmental Guardians', 'Nature Preserve', '+5432167890', 'admin@environment.org');

-- Insert data into the volunteering table
INSERT INTO volunteering (org_id, user_id, volunteering_type, volunteering_description, start_date, end_date)
VALUES
    (1, 1, 'Community Cleanup', 'Cleaning up local parks and streets.', '2023-07-10', '2023-07-12'),
    (2, 2, 'Food Drive', 'Collecting and distributing food to those in need.', '2023-08-05', '2023-08-10'),
    (1, 3, 'Mentoring', 'Providing mentorship to local youth.', '2023-09-15', '2023-09-30'),
    (3, 4, 'Environmental Conservation', 'Preserving and protecting natural habitats.', '2023-10-20', '2023-10-25');



SELECT pg_catalog.setval('users_id_seq', 16, true);

