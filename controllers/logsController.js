const express = require("express");

const logs = express.Router();

const logsArray = require("../models/logsModel");

logs.get('/', (req, res) => {
    res.json({ logs: logsArray})
});

module.exports = logs