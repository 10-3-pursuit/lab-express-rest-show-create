const express = require("express");
const cors = require("cors");

const app = express();

const logsController = require("./controllers/logsController.js");

// MIDDLEWARE PACKAGES
app.use(cors());
app.use(express.json());

//MIDDLEWARE FOR CONTROLLERS
app.use("/logs", logsController);

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to Captain's Log");
  });


// 404 PAGE
app.get("*", (req, res) => {
    res.json({ error: "Page not found" });
  });

module.exports = app