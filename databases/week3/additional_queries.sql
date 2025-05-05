-- Get meals that has a price smaller than a specific price fx 90
SELECT *
FROM Meal
WHERE price < 90;

-- Get meals that still has available reservations
SELECT *
FROM Meal
WHERE available_reservations > 0;

--Get meals that partially match a title. Rød grød med will match the meal with the title Rød grød med fløde
SELECT *
FROM Meal
WHERE title LIKE '%rød grød med%';

-- Get meals that has been created between two dates
SELECT *
FROM Meal
WHERE created_at BETWEEN '2023-01-01' AND '2023-12-31';

-- Get only specific number of meals fx return only 5 meals
SELECT *
FROM Meal
LIMIT 5;

-- top 5 latest meals

SELECT  *
FROM Meal m
order by m.created_date DESC 
limit 5;

--Get the meals that have good reviews
-- with join

select m.* from meal as m
JOIN review as r
ON m.id = r.meal_id
where r.stars >= 4;
-- with subquery
SELECT *
FROM Meal
WHERE id IN (
        SELECT meal_id
        FROM Review
        WHERE stars >= 4
    );

-- Get reservations for a specific meal sorted by created_date
SELECT *
FROM Reservation
WHERE meal_id = 1
ORDER BY created_at DESC;

-- Sort all meals by average number of stars in the reviews
SELECT Meal.*,
    AVG(Review.stars) AS average_stars