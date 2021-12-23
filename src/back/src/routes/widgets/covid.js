const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const {getCovidDataByCountry} = require("../../services/covid");

router.post('/', auth, (req, res) => {
    let country = req.body.country;
    getCovidDataByCountry(country, (status, data) => {
        return res.status(status).json(data);
    })
})

module.exports = router;