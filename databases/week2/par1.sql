--Part 1: Working with tasks
--Add a task with these attributes: title, description, created, updated, due_date, status_id, user_id
INSERT INTO task (
        title,
        description,
        created,
        updated,
        due_date,
        status_id,
        user_id
    )
VALUES (
        'Task1',
        'Description of task1',
        NOW(),
        NOW(),
        ADDDATE(now(), INTERVAL 1 DAY),
        1,
        1
    );
--Change the title of a task
UPDATE task t
set t.title = 'update task1'
where t.id = 36;
--Change a task due date
UPDATE task t
SET t.due_date = ADDDATE(now(), INTERVAL 2 DAY)
WHERE t.id = 36;
--Change a task status
UPDATE task t
SET t.status_id = 2
WHERE t.id = 36;
--Mark a task as complete
UPDATE task t
SET t.status_id = 3
WHERE t.id = 36;
--Delete a task
DELETE from task t
WHERE t.id = 36;