const sql = require('mysql2');

// Stores MySQL connection information
var conn = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'se3309_assignment4_database'
});

module.exports = conn;