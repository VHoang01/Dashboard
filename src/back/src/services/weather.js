const axios = require('axios');

const getWeatherByCity = (city, callback) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`).then((response) => {
        callback(200, response.data);
    }).catch((err) => {
        callback(400, err.response.data);
    });
}

module.exports = {getWeatherByCity};