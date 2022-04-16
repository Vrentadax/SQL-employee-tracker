// require mysql2 package
const mysql = require('mysql2');

// sql credentials to connect to db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'notthis(A187SQLsql)',
        database: 'company_info'
    },
    console.log('Connected to the database.')
);

module.exports = db;