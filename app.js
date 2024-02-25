const express = require('express')
const cors = require('cors')

const app = express()

const logsController = require('./controllers/logsController');

// middleware packages
app.use(cors());
app.use(express.json());

// my middleware for controllers 
app.use('/api/logs', logsController)

app.get('/', (req, res) => {
    res.send('welcome to my backend!!!!')
})



app.get('*', () => {
    res.json({ error: "page not found"})
})


module.exports = app
