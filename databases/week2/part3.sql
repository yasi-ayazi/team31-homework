--Part 3: More queries
--Get all the tasks assigned to users whose email ends in @spotify.com
SELECT t.*
from task t
    join user_task ut on t.id = ut.task_id
    JOIN `user` u on ut.user_id = u.id
WHERE u.email like '%@spotify.com';
--Get all the tasks for 'Donald Duck' with status 'Not started'
SELECT t.*
from task t
    join status s on t.status_id = s.id
    join user_task ut on t.id = ut.task_id
    JOIN `user` u on ut.user_id = u.id
where u.name = 'Donald Duck'
    and s.name = 'Not started';
--Get all the tasks for 'Maryrose Meadows' that were created in september (hint: month(created)=month_number)
SELECT t.*
from task t
    join user_task ut on t.id = ut.task_id
    JOIN `user` u on ut.user_id = u.id
where u.name = 'Maryrose Meadows'
    and MONTH(t.created) = 9;
--Find how many tasks where created in each month, e.g. how many tasks were created in october, how many tasks were created in november, etc. (hint: use group by)
SELECT MONTH(t.created),
    COUNT(*)
from task t
GROUP by MONTH(created);