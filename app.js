// DEPENDENCIES

const express = require('express');
const cors = require("cors");

// CONFIGURATION
const app = express()





const logsController = require('./controllers/logsController.js');

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());


app.use('/logs', logsController)

//ROUTES
app.get('/', (req, res) => {
    res.send(`Welcome to Capitan's Log`)
})


// 404 Pague not found

app.get('*', (req, res) => {
    res.status(404).json({error: 'Page not found'});
});


// EXPORT
module.exports = app