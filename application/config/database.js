const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'Sunny',
    password: 'ciyuan53',
    database: 'csc317db',
    debug: false
})

const promisePool = pool.promise();
module.exports = promisePool;