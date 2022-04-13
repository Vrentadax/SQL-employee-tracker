const mysql = require('mysql2');

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