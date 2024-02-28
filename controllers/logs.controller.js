const express = require('express'); 

const logs = express.Router();

const logsData = require('../models/logs.model');

logs.get('/', (req, res)=> {
    res.json({logs: logsData})
});

//this allows to check the user id input
    logs.get('/:id',(req, res) =>{
        //this is the id of the selected user log input
        const { id } = req.params

        //native array function saved to a variable
        const selectedLog = logsData.find(log => log.id === +id)
        selectedLog ? res.status(200).json(selectedLog) : res.status(400).json({ message: `Log with ID ${id} could not be found.` })
    });
  
    logs.post('/', (req, res)=> {
        //you need to get the req.body and id to get the user input
        const newId = logsData[logsData.length -1].id +1;
        req.body.id = newId;
        logsData.push(req.body);
        res.json({logs:logsData})

    });



module.exports = logs;