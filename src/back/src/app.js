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

app.use('/auth/login', AuthLoginRoute);
app.use('/auth/register', AuthRegisterRoute);

app.listen(8080, () => {
    console.log("Server open at: http://localhost:8080");
})