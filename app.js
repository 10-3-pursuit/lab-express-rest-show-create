// dependencies
const express = require('express');

//config
const app = express();

// ROUTES
app.get('/', (req, res) => {
    res.status(200).json({ "message" : "Hello, World! :-]" })
});

// 404 page
app.get('*', (req, res) => {
    res.status(404).json({ error: 'Sorry, page not found' })
});

//export
module.exports = app;