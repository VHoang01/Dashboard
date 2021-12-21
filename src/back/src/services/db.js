const mariadb = require('mariadb');

require('dotenv').config();

module.exports = mariadb.createPool(
    {
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        database: process.env.MARIADB_DATABASE,
        password: process.env.MARIADB_PASSWORD,
        port: 3306,
        socketTimeout: 500,
        connectTimeout: 500,
        acquireTimeout: 500
    }
);