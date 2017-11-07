var express = require('express');
var router = express.Router({mergeParams : true});
var Task = require('../dbmodels/task.js');

router.get('/', function(req, res, next) {
  Task.find({}, function(err, tasks){
    if(err) {
      next(err);
    } else {
      res.json(tasks);
    }
  });
});

router.post('/', function(req, res, next) {
  let task = new Task({
    title: req.body.title,
    description: req.body.description,
    groupId: req.body.groupId
  });

  task.save(function(err, task){
    if(err) {
      next(err);
    } else {
      Task.find({groupId: req.body.groupId}, function(err, tasks){
        if(err) {
          next(err);
        } else {
          console.log(req.body);
          console.log(tasks);
          res.json(tasks);
        }
      });
    }
  });
});

router.delete('/:tid/:gid', function(req, res, next) {

  Task.remove({_id: req.params.tid}, function(err) {
    if (err) {
      next(err);
    } else {
      //console.log(task);
      Task.find({groupId: req.params.gid}, function(err, tasks){
        if(err) {
          next(err);
        } else {
          res.json(tasks);
        }
      });
    }
  });
});

router.get('/:gid', function(req, res, next) {
  console.log('im here');
  Task.find({groupId: req.params.gid}, function(err, tasks){
    if(err) {
      next(err);
    } else {
      res.json(tasks);
    }
  });
});

router.put('/:tid', function(req, res, next) {
  console.log(req.body);
  Task.update({_id: req.params.tid}, {$set: req.body}, function(err) {
    if (err) {
      next(err);
    } else {
      Task.find({groupId: req.body.groupId}, function(err, tasks){
        if(err) {
          next(err);
        } else {
          res.json(tasks);
        }
      });
    }
  });
});

module.exports = router;