const express = require("express");

const validateForm = (req, res, next) => {
    if(!req.body.captainName || !req.body.title || !req.body.post)
        res.status(400).json({ message: "invalid Inputs" });
    else next();
}

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

logs.post("/", validateForm, (req, res) => {
    const newId = logsArray[logsArray.length - 1].id + 1;
    
    req.body.id = newId

    logsArray.push(req.body)
    res.json({ logs: logsArray })
})

logs.put("/:id", (req, res) => {
    const { id } = req.params;

    const logIndex = logsArray.findIndex((log) => log.id === +id)

    if (logIndex > -1) logsArray[logIndex] = req.body;

    res.json({ logs: logsArray })
})


logs.delete("/:id", (req, res) => {
    const { id } = req.params

    logsArray = logsArray.filter((log) => log.id !== +id)

    res.json({ logs: logsArray});
})


module.exports = logs