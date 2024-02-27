const express = require("express");

const logs = express.Router();


let logsArray = require("../models/logsModel");

logs.get('/', (req, res) => {
    res.json({ logs: logsArray})
});

logs.get("/:id", (req, res) => {
    const { id } =req.params;

    const log = logsArray.find((log) => log.id === +id)

    res.json({ log })
})

logs.post("/", (req, res) => {
    const newId = logsArray[logsArray.length - 1].id + 1;
    
    req.body.id = newId
    console.log(req.body)

    logsArray.push(req.body)
    res.json({ logs: logsArray })
})


logs.delete("/:id", (req, res) => {
    const { id } = req.params

    logsArray = logsArray.filter((log) => log.id !== +id)

    res.json({ logs: logsArray});
})


module.exports = logs