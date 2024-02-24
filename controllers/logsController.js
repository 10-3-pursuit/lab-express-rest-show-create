const express = require("express");

const logs = express.Router();

const logsArray = require("../models/logs.model.js");

logs.get("/", (req, res) => {
    res.json({ logs: logsArray });
  });

  logs.get('/:id', (req, res) => {
    const { id } = req.params
    const log = logsArray.find((log) => log.id === +id)
    res.json({ log })
  })

  logs.post('/', (req, res) => {
    const newID = logsArray[logsArray.length - 1].id +1
    req.body.id = newID
    logsArray.push(req.body)
    res.json({ logs: logsArray })
  })

  module.exports = logs;