const db = require('../services/db');

const updateUserWidgetsData = (userId, data, callback) => {
    db.getConnection().then((con) => {
        con.query(`UPDATE users SET settings = '${JSON.stringify(data)}' WHERE uuid LIKE '${userId}';`).then((rows) => {
            callback(rows[0]);
        }).then(async () => {
            await con.end();
        })
    });
}

const getUserWidgetsData = (userId, callback) => {
    db.getConnection().then((con) => {
        con.query(`SELECT settings FROM users WHERE uuid = '${userId}'`).then((rows) => {
            callback(rows[0].settings);
        }).then(async () => {
            await con.end();
        });
    }).catch(() => callback(null));
}

module.exports = {updateUserWidgetsData, getUserWidgetsData}