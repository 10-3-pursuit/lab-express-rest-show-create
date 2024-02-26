const express = require('express');
const logs = express.Router(); // each resource must have it's own router
const logsData = require('../models/logs.model');

logs.get('/', (req, res) => {
    res.status(200).json({ logs: logsData });
});

logs.get('/:id',(req, res) => {
    const { id } = req.params
    const selectedLog = logsData.find(log => log.id === +id)
    selectedLog ? res.status(200).json(selectedLog) : res.status(400).json({ message: `Log with ID ${id} could not be found.` })
});

logs.post('/', (req, res) => {
    const newId = logsData[logsData.length - 1].id + 1; // access last object in logsdata logsData[logsData.length - 1] then the id logsData[logsData.length - 1].id then adding plus 1 (also makes it a number)
    req.body.id = newId; // add this new id to incoming req.body bc it won't have an id
    logsData.push(req.body);
    // always send back response with object of data so developer can reset data in react using useState
    res.json({ logs: logsData });
})

// delete fx works but doesn't persist unless parsed to JSON and data exists in JSON or database
logs.delete('/:id', (req, res) => {
    const { id } = req.params;
    // const id = parseInt(req.params.id, 10); // Convert to number for accurate comparison (second param is for base 10)
    const index = logsData.findIndex(log => log.id === +id); // Find the log by ID
    if (index === -1) { // when log not found .findIndex returns -1
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    logsData.splice(index, 1); // Delete the log from the array if found
    res.status(204).json({
        status: 'success',
        data: null // indicate the deletion was successful
    });
});

module.exports = logs; // logs is an object - must be exported to be used throughout this application