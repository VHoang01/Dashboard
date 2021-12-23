const axios = require("axios");

const getMostPopular = (days, callback) => {
    const url = "https://api.nytimes.com/svc/mostpopular/v2/viewed/" + days + ".json?api-key=" + process.env.NYT_API_KEY;
    axios.get(url).then((response) => {
        callback(200, response.data);
    });
}

module.exports = {getMostPopular}