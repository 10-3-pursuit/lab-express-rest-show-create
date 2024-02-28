const express = require("express");
const cors = require("cors");

const app = express();

const logsController = require("./controllers/logs.controller");
// const queriesController = require("./controllers/queries.controller");

app.use(cors());
app.use(express.json());

app.use("/logs", logsController);

// app.use("/api/logs", queriesController);

app.get("/", (req, res) => {
  res.send("Welcome to the Captain's Log");
});

app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});

module.exports = app;
