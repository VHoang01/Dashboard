const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./services/db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const AuthLoginRoute = require('./routes/auth/login');
const AuthRegisterRoute = require('./routes/auth/register');
const WidgetRoute = require('./routes/widgets/index');
const WeatherRoute = require('./routes/widgets/weather');
const ForecastRoute = require('./routes/widgets/forecast');
const NewsPopularRoute = require('./routes/widgets/newspopular');
const CovidRoute = require('./routes/widgets/covid');

app.use('/auth/login', AuthLoginRoute);
app.use('/auth/register', AuthRegisterRoute);
app.use('/widgets/weather', WeatherRoute);
app.use('/widgets/forecast', ForecastRoute);
app.use('/widgets/newspopular', NewsPopularRoute);
app.use('/widgets/covid', CovidRoute);
app.use('/widgets', WidgetRoute);

app.listen(8080, () => {
    console.log("Server open at: http://localhost:8080");
})