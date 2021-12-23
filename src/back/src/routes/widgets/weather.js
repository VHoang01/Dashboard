const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const {getWeatherByCity} = require("../../services/weather");

router.post('/', auth, (req, res) => {
    let city = req.body.city;
    getWeatherByCity(city, (status, data) => {
        return res.status(status).json(data);
    })
})

module.exports = router;