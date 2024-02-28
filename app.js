// DEPENDENCIES
const express = require('express')
const cors = require('cors');

// CONFIGURATION
const app = express();
app.use(cors());

//MIDDLEWARE FOR FETCH RQUESTS other than GET
//the reason why you need this is that incoming request are in html etc; this modifies the data so it can be put in json
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('HELLO WORLD!!!')
})
//routing logs from controller and data
//you need to "require"  a data by by creating a  CONSTANT variable and by using CONST
const logsController = require('./controllers/logs.controller');

//MIDDLEWARE specifically for logs
app.use('/logs', logsController);


// EXPORT
module.exports = app