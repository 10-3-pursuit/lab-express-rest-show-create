const express = require("express");
const cors = require("cors");

const app = express();

const logsController = require("./controllers/logs.controller");

app.use(cors());

app.use("/logs", logsController);

app.get("/", (req, res) => {
  res.send("Welcome to the Captain's Log");
});

app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});

module.exports = app;
