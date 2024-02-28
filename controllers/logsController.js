// we need to import express to create the router for the resource. In this case the resource is bookmarks.
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
  const logs = logsArray.find((log) => log.id === +id);
  res.json({ logs });
});

//create a route for POST
logs.post("/", (req, res) => {
  // need to fake create a new id. will take the last id number in the bookmarks array and add 1
  const newId = logsArray[logsArray.length - 1].id + 1;
  req.body.id = newId;
  // because our data is of the type array I push to the array
  logsArray.push(req.body);
  res.json({ logs: logsArray });
});

// UPDATE
logs.put("/:id", (req, res) => {
  // accessing id with req.params
  const { id } = req.params;
  // declared a variable and set it equal to the result of a specifc index given in the array
  const LogIndex = logsArray.findIndex((log) => log.id === +id);
  // check if id exists, if id exists collect all the info in the form using req.body
  if (LogIndex > -1) logsArray[bookmarkIndex] = req.body;

  // send back all the logs because I plan to reset the setLogs state
  res.json({ logs: logsArray });
});

// DELETE
// take logs data and delete based on id
logs.delete("/:id", (req, res) => {
  // set id variable
  const { id } = req.params;
  // the new logs array will be equal to a filtered version of the array with all the id's that aren't the given id
  logsArray = logsArray.filter((log) => log.id !== +id);
  // reset the data to new logs array
  res.json({ logs: logsArray });
});

// export bookmarks varidable to be used in the app.js file
module.exports = logs;
