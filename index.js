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

function init() {
    function options() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'main',
                message: 'What would you like to do?',
                choices: ['View all departments','View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee']
            },
        ]).then(input => {
            switch(input.main) {
                case 'view all departments':
                    viewDepartments();
                    break;
                case 'view all roles':
                    viewRoles();
                    break;
                case 'view all employees':
                    viewEmployees();
                    break;
                case 'add a department':
                    addDepartment();
                    break;
                case 'add a role':
                    addRole();
                    break;
                case 'add an employee':
                    addEmployee();
                    break;
                case 'update an employee role':
                    updateRole();
                    break;
            };
        });
    };

    function viewDepartments() {

    };

    function viewRoles() {

    };

    function viewEmployees() {

    };

    function addDepartment() {

    };

    function addRole() {

    };

    function addEmployee() {

    };

    options();
}
init();