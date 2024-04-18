const express = require('express')
const logs = express.Router()
const logsArray = require('../models/logs.model.js')

logs.get('/', (req, res) => {
    res.json(logsArray)
})

logs.get("/:id", (req, res) => {
  const { id } = req.params;

  const log = logsArray.find((log) => log.id === +id);

  if (!log){
    res.redirect('/404');
     return;
  }

  res.json({ log });
});

logs.post('/', (req, res) => {
    console.log(req.body);

    const newId = logsArray[logsArray.length - 1].id + 1;

    req.body.id = newId;
    console.log(req.body);

 logsArray.push(req.body)
const newLog = req.body
res.json(newLog)
//res.status(201).json(newLog)
//     res.json({ logs: logsArray });
 });

 logs.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = logsArray.findIndex(log => log.id === +id);
  if (index !== -1){
    logsArray.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Log entry not found'});
  }
 });

module.exports = logs