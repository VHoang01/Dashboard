const db = require('../services/db');

const loginUser = (username, password, cb) => {
    db.getConnection().then(con => {
        con.query(`SELECT uuid, password FROM users WHERE username = ${username}`).then(rows => {
            if (rows.length === 0)
                return cb(null);
            if (rows[0].password === password)
                return cb(rows[0].uuid);
            else
                return cb(null);
        }).then(() => {
            con.end();
        });
    }).catch(() => {
        return cb(null);
    });
}

module.exports = {loginUser};