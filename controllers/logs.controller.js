// we need to import express to create the router resourse in this case ressourse is the logs
const express = require('express')

//we need to create router which is a way to refrence in app.js this file
const logs = express.Router()

// I want to return the data as json from the model using my controller
let logsArray = require('../models/logs.model.js')

//creeate get route to return json data to the client
logs.get('/', (req, res) => {
  res.json({ logs : logsArray })
})

logs.get('/:id', (req, res) => {
  const { id } = req.params

  isId = logsArray.find((log) => log.id === +id)

  if(isId){
    const log = logsArray.find((log)=> log.id === +id)
    res.json({ log })
  }else{
    res.redirect("/ID-Not_found")
    // res.status(404).json({ error: `Log with the ID ${id} not found` });
  }
});

logs.post("/", (req, res) => {

  // i need to fake create a new id. i will take the last id number in the logs array and add 1
  const newId = logsArray[logsArray.length - 1].id + 1;

  // req.body is an object. I will add an id to the object
  req.body.id = newId;
  console.log(req.body);

  //badd data to the end of the array
  logsArray.push(req.body);

  // send back all the logs becuase i plan to reset the logs
  res.json({ logs: logsArray });
});

//Updates a log
logs.put("/:id", (req, res) => {
  const { id } = req.params;
  const logsIndex = logsArray.findIndex((log) => log.id === +id);
  if (logsIndex > -1) logsArray[logsIndex] = req.body;
  if(logsIndex === -1){
      res.redirect("/ID-Not_found")
    }else{
    // send back all the logs because I plan to reset the  state
    res.json({ logs: logsArray });
  }
});

// to delete a single Log
logs.delete("/:id", (req, res) => {
    const { id } = req.params;
    isId = logsArray.find((log) => log.id === +id)

    if(isId){

      logsArray = logsArray.filter((log) => log.id !== +id);
      res.json({ logs: logsArray });
    }else{
      res.redirect("/ID-Not_found")
    }
});

// export line 5 logs variable to be used in the app.js file
module.exports = logs
