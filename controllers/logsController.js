const express = require("express");

function validateForm(req, res, next) {
    if (!req.body.name || !req.body.category || !req.body.url)
      res.status(400).json({ message: "Invalid Inputs" });
    else next();
  }

const logs = express.Router();

let logsArray = require("../models/logs.model.js");

logs.get("/", (req, res) => {
    res.json({ logs: logsArray });
  });

  logs.get('/:id', (req, res) => {
    const { id } = req.params
    const log = logsArray.find((log) => log.id === +id)
    res.json({ log })
  })

  logs.post('/', validateForm,  (req, res) => {
    const newID = logsArray[logsArray.length - 1].id +1
    req.body.id = newID
    logsArray.push(req.body)
    res.json({ logs: logsArray })
  })

  logs.delete('/:id', (req, res) => {
    const { id } = req.params
    logsArray = logsArray.filter((log) => log.id !== +id)
    res.json({ logs: logsArray })
  });

  logs.put('/:id', validateForm, (req, res) => {

    const { id } = req.params
    const logIndex = logsArray.findIndex((log) => log.id === +id)
    if(logIndex > -1){
        logsArray[logIndex] = req.body
        res.json({ logs: logsArray })
    } else {
        res.json({ message: "Log not found" })
    }
  })




  module.exports = logs;