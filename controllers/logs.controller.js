const express = require("express");

const logs = express.Router();

let logsArray = require("../models/logs.model");

logs.get("/", (req, res) => {
  res.json({ logs: logsArray });
});

logs.get("/:id", (req, res) => {
  const { id } = req.params;
  const targetLog = logsArray.filter((log) => log.id === parseInt(id));

  if (Object.keys(targetLog).length > 0) {
    res.json(targetLog);
  } else {
    res.json({ message: "Could not find log" });
  }
});

logs.post("/", (req, res) => {
  const newId = logsArray[logsArray.length - 1].id + 1;
  req.body.id = newId;
  logsArray.push(req.body);
  res.json({ logs: logsArray });
});

logs.put("/:id", (req, res) => {
  const { id } = req.params;
  const logIndex = logsArray.findIndex((log) => log.id === +id);
  if (logIndex > -1) {
    logsArray[logIndex] = req.body;
  }
  res.json({ log: logsArray[logIndex] });
});

logs.delete("/:id", (req, res) => {
  const { id } = req.params;
  logsArray = logsArray.filter((log) => log.id !== parseInt(id));
  res.json({ logs: logsArray });
});

module.exports = logs;
