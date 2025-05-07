-- Get all meals
SELECT * FROM Meal;

-- Add a new meal
INSERT INTO Meal (title, description, location, `when`, max_reservations, price)
VALUES ('Sample Meal', 'Tasty meal description', 'Copenhagen', '2025-06-01 18:00:00', 20, 149.99);

-- Get a meal with ID = 1
SELECT * FROM Meal WHERE id = 1;

-- Update a meal with ID = 1
UPDATE Meal
SET title = 'Updated Meal Title', price = 159.99
WHERE id = 1;

-- Delete a meal with ID = 1
DELETE FROM Meal WHERE id = 1;