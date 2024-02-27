// DEPENDENCIES
const express = require("express");
const cors = require("cors");


// CONFIGURATION
const app = express();

// import the controller in order to tell the application to use the specific resource's controller
const logsController = require("./controllers/logsController.js");

// MIDDLEWARE PACKAGES
app.use(cors());
// needed for POST and PUT. Will parse the string sent from the fetch
app.use(express.json());

//MIDDLEWARE FOR CONTROLLERS
// I want to use the bookMarkController routes with this base url
app.use("/api/logs", logsController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to the Captain's log.");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});
// EXPORT
module.exports = app;
