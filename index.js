//inquirer (select*all departments/roles/employees)(add department)

//department = id/name

//role = id/title/salary/department_id

//employee = id/first_name/last_name/role_id/manager_id

//add department = enter name of department += table

//add role = enter name/salary/department

//add employee = first/last/role/manager

//update employee role = select employee to update and new role is updated

const inquirer = require('inquirer');
const table = require('console.table');
const db = require('./db/connection');

// initial function to start everything
const init = () => {
    const mainMenu = () => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'main',
                message: 'What would you like to do?',
                choices: [new inquirer.Separator('---VIEW---'), 'View all departments', 'View all roles', 'View all employees', new inquirer.Separator('---ADD---'), 'Add a department', 'Add a role', 'Add an employee', new inquirer.Separator('---UPDATE---'), 'Update an employee role', new inquirer.Separator('---DONE---'), 'Done!']
            },
            // switch for main menu to navigate to functions
        ]).then(input => {
            switch (input.main) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateRole();
                    break;
                default:
                    done();
            };
        });
    };

    // pulls all departments into a table
    const viewDepartments = () => {
        const sql = `SELECT * FROM departments`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(rows);
            mainMenu();
        });
    };

    // pulls all roles (id/title/salary) and lists them in a table with department
    const viewRoles = () => {
        const sql = `SELECT roles.id, roles.title, departments.department, roles.salary
                     FROM roles
                     INNER JOIN departments ON roles.department_id = departments.id`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(rows);
            mainMenu();
        });
    };

    // pulls all employees (id/first and last name) and lists them with role/department/manager
    const viewEmployees = () => {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name,
                     roles.title, departments.department, roles.salary,
                     concat(manager.first_name, ' ', manager.last_name) manager
                     FROM employees employee
                     INNER JOIN roles ON employee.role_id = roles.id
                     INNER JOIN departments ON roles.department_id = departments.id
                     LEFT JOIN employees manager ON manager.id = employee.manager_id`;
        db.query(sql, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.table(rows);
            mainMenu();
        });
    };

    // add a new department to db
    const addDepartment = () => {
        // prompts user for new department name
        inquirer.prompt([
            {
                type: 'input',
                name: 'new_department',
                message: 'What is the new department called?'
            }
        // insert department into table
        ]).then(input => {
            const sql = `INSERT INTO departments(department) VALUES (?)`;
            const params = input.new_department;
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(`Added ${params} to the database`);
                mainMenu();
            });
        });
    };

    // add a new role to the db
    const addRole = () => {
        // prompt user for necessary info
        inquirer.prompt([
            {
                type: 'input',
                name: 'new_role',
                message: 'What is the new role called?'
            },
            {
                type: 'input',
                name: 'new_department_id',
                message: `What is the new role's department id?`,
                validate: input => {
                    if (!isNaN(input)) {
                        return true;
                    } else {
                        console.log('Please enter a number');
                        return false;
                    };
                }
            },
            {
                type: 'input',
                name: 'new_salary',
                message: `What is the new role's salary?`,
                validate: input => {
                    if (isNaN(input)) {
                        console.log('Please enter a number');
                        return false;
                    } else {
                        return true;
                    };
                }
            }
        // insert role/department/salary
        ]).then(input => {
            const sql = `INSERT INTO roles(title, department_id, salary) VALUES (?,?,?)`;
            const params = [input.new_role, input.new_department_id, input.new_salary];
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(`Added ${params[0]} to the database`);
                mainMenu();
            });
        });
    };

    // add a new employee and assign department and confirm manager (if any)
    const addEmployee = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: `What is the new employee's first name?`
            },
            {
                type: 'input',
                name: 'last_name',
                message: `What is the new employee's last name?`
            },
            {
                type: 'input',
                name: 'role_id',
                message: `What is the new employee's role id?`,
                validate: input => {
                    if (!isNaN(input)) {
                        return true;
                    } else {
                        console.log('Please enter a number');
                        return false;
                    };
                }
            },
            {
                type: 'confirm',
                name: 'confirm_manager',
                message: 'Is this person a manager?',
                default: false
            },
            {
                type: 'input',
                name: 'manager_id',
                message: `What is the new employee's manager id?`,
                when: ({ confirm_manager }) => {
                    if (confirm_manager) {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
                validate: input => {
                    if (!isNaN(input)) {
                        return true;
                    } else {
                        console.log('Please enter a number');
                        return false;
                    };
                }
            }
        // insert user data into table
        ]).then(input => {
            const sql = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
            const params = [input.first_name, input.last_name, input.role_id, input.manager_id];
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(`Added ${params[0]} ${params[1]} to the database`);
                mainMenu();
            });
        });
    };

    // update an employee and assign new role
    const updateRole = () => {
        const employees = [];
        // create list of employees to select from
        db.query(`SELECT employees.id, employees.first_name, employees.last_name FROM employees`, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            result.forEach(item => {
                const name = `${item.first_name} ${item.last_name}`;
                employees.push(name);
            });

            // request user input for new updated role they want to assign
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'update',
                    message: `Who's role do you want to update?`,
                    choices: employees
                },
                {
                    type: 'input',
                    name: 'new_role',
                    message: `What is their new role id?`,
                    validate: input => {
                        if (!isNaN(input)) {
                            return true;
                        } else {
                            console.log(' Please enter a number');
                            return false;
                        };
                    }
                }
            ]).then(input => {
                const split = input.update.split(' ');
                const sql = `UPDATE employees
                             SET role_id = ${input.new_role}
                             WHERE first_name = '${split[0]}'
                             AND last_name = '${split[1]}'`
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(result);
                    mainMenu();
                });
            });
        });
    };

    // simple function to quit application when "Done!" is selected
    const done = () => {
        console.log('Goodbye!');
        process.exit();
    };

    mainMenu();
};

init();