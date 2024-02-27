//DEPENDENCIES
const express = require("express")
const cors = require("cors")

// CONFIGURATION
const app = express();

const logsController = require("./controllers/logs.controller.js")
// CORS
app.use(cors());

app.use(express.json()); 

//MIDDLEWARE FOR CONTROLLERS
app.use("/logs", logsController)

// ROUTES
app.get ('/', (req, res) => {
    res.send("Welcome to the captain's log")
})

// 404 PAGE
app.get("*", (req, res) => {
    res.json({ error: "Page not found" });
});

module.exports = app;