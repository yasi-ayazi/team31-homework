--Part 4: Creating a database
--Create Book table
CREATE TABLE Book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    published_year INT
);
--Create Genre table
CREATE TABLE Genre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
--Create linking table Book_Genre
CREATE TABLE Book_Genre (
    book_id INT,
    genre_id INT,
    PRIMARY KEY (book_id, genre_id),
    FOREIGN KEY (book_id) REFERENCES Book(id),
    FOREIGN KEY (genre_id) REFERENCES Genre(id)
);
--Create Member table
CREATE TABLE Member (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50)
);
--Create Borrow_Log table
CREATE TABLE Borrow_Log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    book_id INT,
    borrow_date DATE NOT NULL,
    return_date DATE,
    FOREIGN KEY (member_id) REFERENCES Member(id),
    FOREIGN KEY (book_id) REFERENCES Book(id)
);