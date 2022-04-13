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

    const viewEmployees = () => {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name,
                     roles.title, departments.department, roles.salary,
                     concat(manager.first_name, ' ', manager.last_name) manager
                     FROM employees employee
                     INNER JOIN roles ON employee.role_id = roles.id
                     INNER JOIN departments ON roles.department_id = departments.id
                     LEFT JOIN employees manager ON manager.id = employee.manager_id`;
        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err.message);
                return;
            }
            console.table(rows);
            mainMenu();
        });
    };

    const addDepartment = () => {

    };

    const addRole = () => {

    };

    const addEmployee = () => {

    };

    const updateRole = () => {

    };

    const done = () => {
        console.log ('Goodbye!');
        process.exit();
    };

    mainMenu();
};

init();