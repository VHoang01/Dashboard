const express = require('express');
const app = express();
require('dotenv').config()
const db = require('./services/db');

db.getConnection().then((con) => {
   con.query(`SELECT 1 + 1 as solution`).then((row) => {
      console.log(row);
   });
});

app.listen(8080, () => {
    console.log("Server open at: http://localhost:8080");
})