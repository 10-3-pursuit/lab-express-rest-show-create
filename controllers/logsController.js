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



  module.exports = logs;