const express = require('express');
const logs = express.Router(); // each resource must have it's own router - this is an object that creates all of the routes
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

logs.put("/:id", (req, res) => {
    const { id } = req.params;
    const logIndex = logsData.findIndex((log) => log.id === +id);
    if (logIndex > -1) logsData[logIndex] = req.body;
    // in frontend setLog data (useState hook) will reset the state of the data so the data needs to be sent back
    res.json({ logs: logsData });
});

logs.delete("/:id", (req, res) => {
    const { id } = req.params;
    // reassigning logsData to a different value - can't because variable is a const
    const newLogsData = logsData.filter((log) => log.id !== +id); // return everything except the object with selected id that matches value of id key in data
    res.json({ logs: newLogsData });
})

module.exports = logs; // logs is an object - must be exported to be used throughout this application