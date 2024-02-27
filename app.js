const express = require("express");
const cors = require("cors");

const app = express();

const logsController = require("./controllers/logsController.js");
let logsArray = require("./models/logs.model.js")

// MIDDLEWARE PACKAGES
app.use(cors());
app.use(express.json());

//MIDDLEWARE FOR CONTROLLERS
app.use("/logs", logsController);

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to Captain's Log");
  });

//   QUERIES
app.get("/api/logs",  (req, res) => {
    const { captainname, order, mistakes, lastCrisis } = req.query

    if(captainname){
        const searchResults = logsArray.filter((log) => log.captainName.toLowerCase() === captainname.toLowerCase())
        if(searchResults.length > 0){
            res.json({ logs: searchResults})
        } else{
            res.json({ message: `No logs for Captain ${captainname}`})
        }
    } else if(order){
        if(order === "asc"){
            const sortedLogsArray = logsArray.sort((a, b) => a.captainName.localeCompare(b.captainName))
            res.json({ logs: sortedLogsArray })
        } else if(order === "desc"){
            const sortedLogsArray = logsArray.sort((a, b) => b.captainName.localeCompare(a.captainName))
            res.json({ logs: sortedLogsArray })
        } else {
            res.json({ message: "Invalid input."})
        }
    } else if(mistakes){
        mistakesString = mistakes.toString()
        if(mistakesString){
            const filteredTrueLogs = logsArray.filter((log) => log.mistakesWereMadeToday.toString() === mistakesString)
            res.json({ logs: filteredTrueLogs })
        } else {
            res.json({ message: "Invalid input."})
        }
    } else if(lastCrisis){
        if(lastCrisis.includes("gte")){
            const number = lastCrisis.slice(3)
            const newArray = logsArray.filter((log) => log.daysSinceLastCrisis >= +number)
            res.json({ logs: newArray })
        } else if(lastCrisis.includes("gt")){
            const number = lastCrisis.slice(2)
            const newArray = logsArray.filter((log) => log.daysSinceLastCrisis > +number)
            res.json({ logs: newArray })
        } else if(lastCrisis.includes("lte")){
            const number = lastCrisis.slice(3)
            const newArray = logsArray.filter((log) => log.daysSinceLastCrisis <= +number)
            res.json({ logs: newArray })
        } else if(lastCrisis.includes("lt")){
            const number = lastCrisis.slice(2)
            const newArray = logsArray.filter((log) => log.daysSinceLastCrisis < +number)
            res.json({ logs: newArray })
        }
    }
})


// 404 PAGE
app.get("*", (req, res) => {
    res.json({ error: "Page not found" });
  });

module.exports = app