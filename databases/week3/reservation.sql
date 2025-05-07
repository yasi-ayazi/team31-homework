-- Get all reservations
SELECT * FROM Reservation;

-- Add a new reservation
INSERT INTO Reservation (number_of_guests, meal_id, contact_phonenumber, contact_name, contact_email)
VALUES (4, 1, '12345678', 'John Doe', 'john@example.com');

-- Get a reservation with ID = 1
SELECT * FROM Reservation WHERE id = 1;

-- Update a reservation with ID = 1
UPDATE Reservation
SET number_of_guests = 5, contact_name = 'Jane Doe'
WHERE id = 1;

-- Delete a reservation with ID = 1
DELETE FROM Reservation WHERE id = 1;