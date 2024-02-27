const express = require("express");
const cors = require("cors");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Captain's Log");
});

const logsController = require("./controllers/logs.controller");

app.use(cors());
app.use(express.json());

app.use("/api/logs", logsController);

// 404
app.get("*", (req, res) => {
  res.status(404).json("Status 404: This page does not exist");
});

module.exports = app;
