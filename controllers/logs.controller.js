const express = require('express');
const logs = express.Router();
const logsData = require('../models/logs.model');

logs.get('/', (req, res) => {
    res.status(200).json({ logs: logsData });
});

logs.get('/:id',(req, res) =>{
    const { id } = req.params
    const selectedLog = logsData.find(log => log.id === +id)
    selectedLog ? res.status(200).json(selectedLog) : res.status(400).json({ message: `Log with ID ${id} could not be found.` })
});

module.exports = logs;