const mysql_db = require('mysql');

const pool = mysql_db.createPool({
    host: 'localhost',
    datababse: 'testapi',
    user: 'root',
    password: '',
    connectionLimit: 5
});

pool.getConnection((error, connection) => {
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Database Connection Lost');
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.log('Database has too many connection');
        }
        if (error.code === 'ECONNREFUSED') {
            console.log('Database connection was refused');
        }
    } if (connection) connection.release();
    return;
});
module.exports = pool;
