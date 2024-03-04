// dependencies
const express = require('express');
const cors = require("cors"); // npm i cors then import for frontend to work properly regarding PORT


//config
const app = express();

// logs dependency and middleware for controllers (read synchronously so best to import before the middleware)
const logsController = require('./controllers/logs.controller');
//middleware packages
// middleware for incoming requests to parse to json - Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option
app.use(cors());
app.use(express.json());


// ROUTES
app.get('/', (req, res) => {
    res.status(200).json({ "message" : "Hello, World! :-]" })
});


app.use('/logs', logsController);

// 404 page
app.get('*', (req, res) => {
    res.status(404).json({ error: 'Sorry, page not found' })
});

//export
module.exports = app;