const express = require("express");
const logs = express.Router();
const logsData = require("../models/logs.model.js");

logs.get("/", (req, res) => {
  res.json({ logs: logsData });
});

logs.get("/:id", (req, res) => {
  const { id } = req.params;
  const log = logsData.find((log) => log.id === +id);
  log ? res.json({ log }) : res.json("Log not found");
});

logs.post("/", (req, res) => {
  const newId = logsData[logsData.length - 1].id + 1;
  req.body.id = newId;
  logsData.push(req.body);
  res.json({ logs: logsData });
});

module.exports = logs;
