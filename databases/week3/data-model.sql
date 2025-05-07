-- Create the database
CREATE DATABASE IF NOT EXISTS meal_reservation_system;
USE meal_reservation_system;

-- Table: Meal
CREATE TABLE Meal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    `when` DATETIME NOT NULL,
    max_reservations INT,
    price DECIMAL(10, 2),
    created_date DATE DEFAULT CURRENT_DATE
);

-- Table: Reservation
CREATE TABLE Reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number_of_guests INT NOT NULL,
    meal_id INT,
    created_date DATE DEFAULT CURRENT_DATE,
    contact_phonenumber VARCHAR(20),
    contact_name VARCHAR(255),
    contact_email VARCHAR(255),
    FOREIGN KEY (meal_id) REFERENCES Meal(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table: Review
CREATE TABLE Review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    meal_id INT,
    stars INT CHECK (stars BETWEEN 1 AND 5),
    created_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (meal_id) REFERENCES Meal(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
