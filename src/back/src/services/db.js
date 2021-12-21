const mariadb = require('mariadb');

module.exports = mariadb.createPool(
    {
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        database: process.env.MARIADB_DATABASE,
        password: process.env.MARIADB_PASSWORD,
        port: 3306,
    }
);