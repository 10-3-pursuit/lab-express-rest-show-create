// we need to import express to create the router for the resource. In this case the resource is logs.
const express = require("express");

// we need to create a Router which is a way to reference in app.js this file
const logs = express.Router();

// we need to return the data from the model using our controller
let logsArray = require("../models/logs.model.js");

// create get route to return json to the client
logs.get("/", (req, res) => {
  res.json({ logs: logsArray });
});

//create get route to return json for a specific log of a given id
logs.get("/:id", (req, res) => {
  const { id } = req.params;
  const log = logsArray.find((log) => log.id === +id);
  res.json({ log });
});

//create a route for POST
logs.post("/", (req, res) => {
  // need to fake create a new id. will take the last id number in the logss array and add 1
  const newId = logsArray[logsArray.length - 1].id + 1;
  req.body.id = newId;
  //data is an array data type so we can push into the array
  logsArray.push(req.body);
  res.json({ logs: logsArray });
});

// put route
logs.put("/:id", (req, res) => {
  const { id } = req.params;

  const logIndex = logsArray.findIndex((log) => log.id === +id);

  if (logIndex > -1) logsArray[logIndex] = req.body;

  // send back all the bookmarks because I plan to reset the setLogs state
  res.json({ logs: logsArray });
});

// delete route
logs.delete("/:id", (req, res) => {
  const { id } = req.params;

  logsArray = logsArray.filter((log) => log.id !== +id);

  res.json({ logs: logsArray });
});

// export logs variable to be used in the app.js file
module.exports = logs;
