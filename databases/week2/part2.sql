--Part 2: School database
--Create an index on the name column of the student table.
CREATE INDEX idx_student_name ON Student(name);
--Add a new column to the class table named status which can only have the following values: not-started, ongoing, finished (hint: enumerations).
ALTER TABLE Class
ADD COLUMN status ENUM('not-started', 'ongoing', 'finished') DEFAULT 'not-started';