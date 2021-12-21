const express = require('express');
const app = express();
require('dotenv').config()
const db = require('./services/db');

app.listen(8080, () => {
    console.log("Server open at: http://localhost:8080");
})