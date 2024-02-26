// DEPENDENCIES
const express = require('express')
const cors = require("cors")

// CONFIGURATION
const app = express();

//import the controller in order to the tell the application to use the specific resource's controller
const logsController = require('./controllers/logs.controller.js')

//MIDDLEWARE PACKAGES
app.use(cors());
//needed for POST and PUT. will parse the string sent from the fetch
app.use(express.json())

//MIDDLEWARE FOR CONTROLLERS
//i want to use the logs.Constroller routes with this base url
app.use('/api/logs', logsController)

// ROUTES
app.get('/', (req, res) => {
  res.send(`welcome to the captain's log`)
})

// 404 PAGE
app.get('*', (req, res) => {
  res.status(404).json({ error: 'Log not found' });
});

// EXPORT
module.exports = app