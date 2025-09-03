const mysql = require('mysql2');

// Create a connection to the database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql_oop'
});

// Connect to MySQL
conn.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id', conn.threadId);
});

// Export the connection for use in other modules
module.exports = conn;