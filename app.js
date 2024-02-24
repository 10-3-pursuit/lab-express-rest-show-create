// dependencies
const express = require('express');

//config
const app = express();

// middleware for incoming requests to parse to json

// ROUTES
app.get('/', (req, res) => {
    res.status(200).json({ "message" : "Hello, World! :-]" })
});

// logs
const logsController = require('./controllers/logs.controller');
app.use('/logs', logsController);

// 404 page
app.get('*', (req, res) => {
    res.status(404).json({ error: 'Sorry, page not found' })
});

//export
module.exports = app;