CREATE DATABASE school_db;
USE school_db;
-- Create the Class table
CREATE TABLE Class (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    begins DATE NOT NULL,
    ends DATE NOT NULL
);
-- Create the Student table
CREATE TABLE Student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    class_id INT,
    FOREIGN KEY (class_id) REFERENCES Class(id)
);