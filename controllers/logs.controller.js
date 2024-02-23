const express = require('express');
const logs = express.Router();
const logsData = require('../models/logs.model');

logs.get('/', (req, res) => {
    res.status(200).json({ logs: logsData });
});

module.exports = logs;