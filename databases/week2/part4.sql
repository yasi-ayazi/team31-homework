--Table: Author
CREATE TABLE Author (
    AuthorId INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(255) NOT NULL,
    BirthDate DATE,
    Nationality VARCHAR(100)
);
--Table: Book
CREATE TABLE Book (
    BookId INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    PublishedDate DATE,
    Publisher VARCHAR(255),
    ISBN VARCHAR(20)
);
--Table: Genre
CREATE TABLE Genre (
    GenreId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);
--Table: Member
CREATE TABLE Member (
    MemberId INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    StartDate DATE,
    EndDate DATE,
    IsActive BOOLEAN DEFAULT TRUE
);
--Table: ContactInfo
CREATE TABLE ContactInfo (
    ContactInfoId INT AUTO_INCREMENT PRIMARY KEY,
    MemberId INT,
    Address VARCHAR(255),
    Phone VARCHAR(50),
    Email VARCHAR(100),
    ContactType VARCHAR(50),
    FOREIGN KEY (MemberId) REFERENCES Member(MemberId)
);
--Table: PersonalDocument
CREATE TABLE PersonalDocument (
    DocumentId INT AUTO_INCREMENT PRIMARY KEY,
    PersonId INT NOT NULL,
    PersonType ENUM('Member', 'Employee') NOT NULL,
    DocumentType VARCHAR(100),
    DocumentNumber VARCHAR(50),
    IssueDate DATE,
    ExpiryDate DATE,
    INDEX(PersonId)
);
--Table: Borrow
CREATE TABLE Borrow (
    BorrowId INT AUTO_INCREMENT PRIMARY KEY,
    BookId INT,
    MemberId INT,
    BorrowDate DATE NOT NULL,
    ReturnDate DATE,
    Returned BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (BookId) REFERENCES Book(BookId),
    FOREIGN KEY (MemberId) REFERENCES Member(MemberId)
);
--Table: BookAuthor (Many-to-Many)
CREATE TABLE BookAuthor (
    BookId INT,
    AuthorId INT,
    PRIMARY KEY (BookId, AuthorId),
    FOREIGN KEY (BookId) REFERENCES Book(BookId),
    FOREIGN KEY (AuthorId) REFERENCES Author(AuthorId)
);
--Table: BookGenre (Many-to-Many)
CREATE TABLE BookGenre (
    BookId INT,
    GenreId INT,
    PRIMARY KEY (BookId, GenreId),
    FOREIGN KEY (BookId) REFERENCES Book(BookId),
    FOREIGN KEY (GenreId) REFERENCES Genre(GenreId)
);