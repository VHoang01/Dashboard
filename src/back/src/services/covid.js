const axios = require("axios");

const getCovidDataByCountry = (country, callback) => {
    const url = "https://api.covid19api.com/summary";
    axios.get(url).then((response) => {

        for (const data of response.data['Countries']) {
            if (data['Country'] === country) {
                callback(200, data);
            }
        }
    });
}

module.exports = {getCovidDataByCountry}