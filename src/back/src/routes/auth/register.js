const express = require('express');
const router = express.Router();
const {registerUser} = require('../../controllers/AuthControllers')

router.post('/', (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    registerUser(username, password, (user) => {
        if (user === null)
            return res.status(400).json({success: false, message: "Invalid register"});
        res.status(200).json({success: true, user: user});
    });

});

module.exports = router;