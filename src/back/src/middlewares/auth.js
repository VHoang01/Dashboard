const jwt = require("jsonwebtoken");

require('dotenv').config();

module.exports = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token === undefined) {
        return res.status(401).json({
            error: 'You need to be logged !'
        });
    }
    token = token.substring(7, token.length);
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.id;
        next();
    } catch (ex) {
        return res.status(401).json({
            error: 'Invalid credentials'
        })
    }
}