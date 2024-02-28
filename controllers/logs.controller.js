const express = require("express");
const logs = express.Router();

function validateForm(req, res, next) {
  if (!req.body.captainName || !req.body.title || !req.body.post)
    res.status(400).json({ message: "Invalid inputs" });
  else next();
}

let logsData = require("../models/logs.model.js");

logs.get("/", (req, res) => {
  res.json({ logs: logsData });
});

logs.get("/:id", (req, res) => {
  const { id } = req.params;
  const log = logsData.find((log) => log.id === +id);
  if (log) res.json({ log });
  else res.json({ message: "Log not found" });
});

logs.post("/", validateForm, (req, res) => {
  const newId = logsData[logsData.length - 1].id + 1;
  req.body.id = newId;
  logsData.push(req.body);
  res.json({ logs: logsData });
});

logs.put("/:id", validateForm, (req, res) => {
  const { id } = req.params;
  const logIndex = logsData.findIndex((log) => log.id === +id);
  if (logIndex > -1) {
    logsData[logIndex] = req.body;
    res.json({ logs: logsData });
  } else res.json({ message: "Log not found" });
});

logs.delete("/:id", (req, res) => {
  const { id } = req.params;
  logsData = logsData.filter((log) => log.id !== +id);
  if (logsData) res.json({ logs: logsData });
  else res.json({ message: "Logs not found" });
});

//Queries
logs.get("/api/");

module.exports = logs;
