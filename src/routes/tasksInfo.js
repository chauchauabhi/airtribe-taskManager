const tasksRoutes = require('express').Router();
const tasksData = require('../tasks.json');
const validator = require('../helpers/validator');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");

tasksRoutes.use(bodyParser.urlencoded({ extended: false }));
tasksRoutes.use(bodyParser.json());

tasksRoutes.get('/:taskId', (req, res) => {
    let allTasks=tasksData.tasks;
    let taskId=req.params.taskId;
    let result = allTasks.filter(val => val.taskId == taskId)
    res.status(200)
    res.send(result)
})

tasksRoutes.post('/',(req,res) =>{
    const taskDetails = req.body;
    let writePath = path.join(__dirname, '..', 'tasks.json');
  if(validator.validatetaskInfo(taskDetails, tasksData).status) {
    let taskDataModified = JSON.parse(JSON.stringify(tasksData));
    taskDataModified.airtribe.push(taskDetails);
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {encoding:'utf8', flag:'w'});
    res.status(200);
    res.json(validator.validatetaskInfo(taskDetails, tasksData));
  } else {
    res.status(400);
    res.json(validator.validatetaskInfo(taskDetails, tasksData))
  }

})

tasksRoutes.get('/', (req, res) => {
  res.status(200);
  res.send(tasksData);
});

module.exports = tasksRoutes;