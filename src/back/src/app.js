const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./services/db');

db.getConnection(con => {
    console.log(con);
}).catch(err => {
    console.log(err);
})


// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// const AuthLoginRoute = require('./routes/auth/login');

// app.use('/auth/login', AuthLoginRoute);

app.listen(8080, () => {
    console.log("Server open at: http://localhost:8080");
})