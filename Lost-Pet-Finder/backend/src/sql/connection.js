const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_CATALOG,
    charset: process.env.DB_CHARSET
});

// Test Call
pool.getConnection((err, connection) => {
    if (err) {
        console.error(err);
    } else {
        console.log('[MySQL] Successful connection!');
    }

    if (connection) {
        connection.release();
    }
});

// Allow async/await with pool.query
pool.query = util.promisify(pool.query);

module.exports = pool;