const express = require('express');
const router = express.Router();
const {loginUser} = require('../../controllers/AuthControllers');

router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    loginUser(username, password, (user) => {
        if (user === null)
            return res.status(400).json({success: false, message: "Invalid user credentials !"});

        console.log(user);
        // JWT
    });

})

module.exports = router;