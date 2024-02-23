const express = require("express");
const logs = express.Router();
const logsData = require("../models/logs.model.js");

logs.get("/", (req, res) => {
  res.json({ logs: logsData });
});

module.exports = logs;
