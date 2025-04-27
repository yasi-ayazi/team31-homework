-- Find out how many tasks are in the task table
select COUNT(*) tscCount
from task t;
-- Find out how many tasks in the task table do not have a valid due date
SELECT COUNT(*) unvalidDueDateCount
from task t
WHERE ISNULL(t.due_date);
-- Find all the tasks that are marked as done
SELECT t.id,
    t.title,
    t.description,
    t.created,
    t.updated,
    t.due_date,
    s.name taskStatus
FROM task t
    JOIN status s ON t.status_id = s.id
WHERE s.name = 'Done';
-- Find all the tasks that are not marked as done
SELECT t.id,
    t.title,
    t.description,
    t.created,
    t.updated,
    t.due_date,
    s.name taskStatus
FROM task t
    JOIN status s ON t.status_id = s.id
WHERE s.name != 'Done';

-- Get all the tasks, sorted with the most recently created first
select *
FROM task t
ORDER BY t.created DESC;

-- Get the single most recently created task
select *
FROM task t
ORDER BY t.created DESC
LIMIT 1;

-- Get the title and due date of all tasks where the title or description contains database
SELECT t.title,
    t.due_date
from task t
WHERE Upper(t.title) like UPPER('%database%')
    OR LOWER(t.description) like LOWER('%database%');

-- Get the title and status (as text) of all tasks
SELECT t.title,
    s.name
from task t
    JOIN status s ON t.status_id = s.id;

-- Get the name of each status, along with a count of how many tasks have that status
SELECT s.name,
    COUNT(t.status_id) tasksOfStatus
FROM status s
    JOIN task t ON s.id = t.status_id
GROUP BY s.name;

-- Get the names of all statuses, sorted by the status with most tasks first
SELECT s.name,
    COUNT(t.status_id) tasksOfStatus
from status s
    join task t ON s.id = t.status_id
GROUP by s.name
order by COUNT(t.status_id) desc;