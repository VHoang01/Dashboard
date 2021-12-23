const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const {getMostPopular} = require("../../services/news");

router.post('/', auth, (req, res) => {
    getMostPopular(req.body.days, (status, data) => {
        return res.status(status).json(data);
    })
})

module.exports = router;