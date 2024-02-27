const express = require("express")

const logs = express.Router()

let logsArray = require("../models/logs.model")


logs.get("/", (req,res)=>{
    res.json({logs: logsArray})
})

logs.get("/:id", (req, res) => {
    const { id } = req.params;
  
    const log = logsArray.find((log) => log.id === +id);

    if(!log){
        res.redirect("/404")
    }else{
        res.json({ log });
    }
  
});

logs.post("/", (req, res) => {
    const newId = logsArray[logsArray.length - 1].id + 1;
    const { captainName, title, post, mistakesWereMadeToday, daysSinceLastCrisis} = req.body
    
    if(typeof(captainName) === "string" && typeof(title) === "string" && typeof(post) === "string" && typeof(mistakesWereMadeToday) === "boolean" && typeof(daysSinceLastCrisis) === "number"){
        req.body.id = newId;
        logsArray.push(req.body);
        res.json({ logs: logsArray });
    }else{
        res.json({message: "Error, invalid data type for one or more keys"})
    }
});


logs.put("/:id", (req, res) => {
    const { id } = req.params;
  
    const logIndex = logsArray.findIndex((log) => log.id === +id);
  
    if (logIndex > -1) logsArray[logIndex] = req.body;
  
    res.json({ logs: logsArray });
  });

logs.delete("/:id", (req, res) => {
    const originalArray = [...logsArray]
    const { id } = req.params;
  
    logsArray = logsArray.filter((log) => log.id !== +id);
    if(originalArray.length === logsArray.length){
        res.redirect("/404")
    }else{
        logsArray = logsArray.map((log,index)=>{
            log.id = index + 1
            return log
        })
      
        res.json({ logs: logsArray });
    }

  });
  
module.exports = logs