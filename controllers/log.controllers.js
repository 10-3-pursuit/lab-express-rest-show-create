const express = require("express")
const logs = express.Router()
let logsArray = require("../models/logs.model.js")

//ROUTES
logs.get("/", (req, res) => {
    res.json({ logs: logsArray})
});
logs.get("/:id", (req, res) => {
    const { id } = req.params;
    const log = logsArray.find((log) => log.id === +id);
    res.json({ log });
});
// SERVER RECEIVES A POST REQUEST WITH THE LOG DATA IN REQUEST BODY
logs.post("/", (req, res) => {
    // THE SERVER GENERATES A NEW ID FOR THE NEW ENTRY.
    const id = logsArray[logsArray.length - 1].id + 1
    // THE SERVER THEN ADDS NEW ID TO THE REQUEST BODY
    req.body.id = id
    // ONCE THE ID IS IN THE REQUEST BODY THE SERVER ADDS THE ID TO THE DATA ARRAY
    logsArray.push(req.body)
    // FINALLY SERVER SENDS BACK A RESPONSE TO THE CLIENT.
    res.json({ logs: logsArray});
});

logs.put("/:id", (res, req) => {
    const { id } = req.params
    const logIndex = logsArray.findIndex((log) => log.id === +id);
    if (logIndex > -1) logsArray[logIndex] = req.body;
    res.json ({ logs: logsArray })
})

logs.delete("/:id", (req, res) => {
    const { id } = req.params;
    logsArray = logsArray.filter((log) => log.id !== +id);
    res.json({ logs: logsArray });
});

module.exports = logs