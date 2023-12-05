CREATE TABLE people (
    person_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) NOT NULL
);

INSERT INTO people (first_name, last_name, phone_number) VALUES
('John', 'Doe', '123-456-7890'),
('Jane', 'Smith', '987-654-3210'),
('Alice', 'Johnson', '555-111-2222'),
('Bob', 'Williams', '333-444-5555'),
('Eva', 'Martinez', '777-888-9999'),
('David', 'Brown', '111-222-3333'),
('Sophia', 'Taylor', '444-555-6666'),
('Michael', 'Jones', '999-888-7777'),
('Olivia', 'Davis', '666-777-8888'),
('William', 'Clark', '222-333-4444'),
('Emily', 'Hernandez', '888-999-0000'),
('Matthew', 'Rodriguez', '555-666-7777'),
('Emma', 'White', '333-222-1111'),
('Daniel', 'Moore', '777-555-4444'),
('Ava', 'Anderson', '444-666-8888'),
('Jackson', 'Garcia', '111-999-5555'),
('Mia', 'Wilson', '666-333-7777'),
('James', 'Lopez', '222-888-4444'),
('Madison', 'Lee', '999-444-8888'),
('Liam', 'Johnson', '123-987-4567');

SELECT * FROM people;

INSERT INTO people (first_name, last_name, phone_number) VALUES ('New', 'Person', '555-1234');

UPDATE people SET phone_number = '999-8888' WHERE person_id = 1;

DELETE FROM people WHERE person_id = 2;
