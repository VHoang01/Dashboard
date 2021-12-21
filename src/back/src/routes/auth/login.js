const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {loginUser} = require('../../controllers/AuthControllers');

router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    loginUser(username, password, (user) => {
        if (user === null)
            return res.status(400).json({success: false, message: "Invalid user credentials !"});
        return res.status(200).json({
            user: user,
            auth: jwt.sign({username: username, id: user}, process.env.JWT_SECRET)
        });
    });

})

module.exports = router;