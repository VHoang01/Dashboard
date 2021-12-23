const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const {getForecastByCity} = require("../../services/weather");

router.post('/', auth, (req, res) => {
    let city = req.body.city;
    getForecastByCity(city, (status, data) => {
        return res.status(status).json(data);
    })
})

module.exports = router;