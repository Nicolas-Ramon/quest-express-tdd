// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Crée une route répondant à un GET sur '/' //
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello World!'
    })
});

module.exports = app;