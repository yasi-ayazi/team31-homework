-- Get all reviews
SELECT * FROM Review;

-- Add a new review
INSERT INTO Review (title, description, meal_id, stars)
VALUES ('Great meal', 'The food was amazing!', 1, 5);

-- Get a review with ID = 1
SELECT * FROM Review WHERE id = 1;

-- Update a review with ID = 1
UPDATE Review
SET title = 'Updated Review Title', stars = 4
WHERE id = 1;

-- Delete a review with ID = 1
DELETE FROM Review WHERE id = 1;