INSERT INTO departments(department)
VALUES 
('Management'),
('Developers'),
('Interns');

INSERT INTO roles(title, department_id, salary)
VALUES
('CEO', 1, 1000000),
('CFO', 1, 750000),
('Senior Developer', 2, 100000),
('Junior Developer', 2, 57000),
('Supervisor', 3, 32000),
('Intern', 3, 20000);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
('Matthew', 'Rogers', 1, null),
('Hannah', 'Rogers', 2, 1),
('Hal', 'Jordan', 3, null),
('Gerald', 'Rivia', 4, 3),
('Mark', 'Strong', 5, null),
('Gary', '...', 6, 5);