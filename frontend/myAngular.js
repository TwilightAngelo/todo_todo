var module = angular.module('app', []);

module.controller('groupsCtrl', function(groupFactory, $scope){

  groupFactory.getGroups()
    .then(function(data) {
      if (data) {
        $scope.groups = data;
      } else {
        console.log('error');
      }
    }, function(error) {
          console.log('error');
  });

  this.getGroups =  function() {
    groupFactory.getGroups()
    .then(function(data) {
      if (data) {
        $scope.groups = data;
      } else {
        console.log('error');
      }
    }, function(error) {
          console.log('error');
    });
  };

  this.addGroup = function(group) {
    groupFactory.addGroup(group)    
    .then(function(data) {
      if (data) {
        $scope.groups = data;
      } else {
        console.log('error');
      }
    }, function(error) {
          console.log('error');
    });
  };
});

module.controller('taskCtrl', function(taskFactory, $scope) {

  var isEdit = false;
  var currentTask = null;
  $scope.activeTaskIndex;

  this.getTasks = function(group) {
    taskFactory.getTasks(group)
      .then(function(data){
        if (data) {
          $scope.tasks = data;
        } else {
          console.log('error');
        }
      }, function(error) {
        console.log('error');
      });
  }

  this.addTask = function(group) {
    var newTask = { title : this.task.title,
                    description : this.task.description,
                    groupId : group._id
    }
    taskFactory.addTask(newTask)
      .then(function(data){
        if (data) {
          $scope.tasks = data;
        } else {
          console.log('error');
        }
      }, function(error) {
        console.log('error');
      });
  }

  this.removeTask = function(task) {
    taskFactory.removeTask(task)
      .then(function(data){
        if (data) {
          $scope.tasks = data;
        } else {
          console.log('error');
        }
      }, function(error) {
        console.log('error');
      });
  }

  this.updateTask = function(task) {
    var newTask = { _id : this.currentTask._id,
                    title : this.task.title,
                    description : this.task.description,
                    groupId : this.currentTask.groupId
    }
    taskFactory.updateTask(newTask)
      .then(function(data){
        if (data) {
          $scope.tasks = data;
        } else {
          console.log('error');
        }
      }, function(error) {
        console.log('error');
      });
    this.editTask(task);
  }

  this.isEdit = function(index) {
      return $scope.activeTaskIndex === index;
  }

  this.editTask = function(index, task) {
    if ($scope.activeTaskIndex === index) {
        $scope.activeTaskIndex = null;
    } else {
        $scope.activeTaskIndex = index;
        this.currentTask = angular.copy(task);
    }
  }
});

module.controller('groupCtrl', function(groupFactory ,taskFactory, $scope) {

  var isEdit = false;
  var currentGroup = null;
  $scope.activeGroupIndex;

  this.updateGroup = function(group) {
    var newGroup = { _id : this.currentGroup._id,
                    title : this.group.title
    }
    groupFactory.updateGroup(newGroup);
    this.isEdit = false;
    this.currentTask = null;
  }

  this.getTasks = function(group) {
    taskFactory.getTasks(group)
      .then(function(data){
        if (data) {
          $scope.data = data;
        } else {
          console.log('error');
        }
      }, function(error) {
        console.log('error');
      });
  }

  this.removeGroup = function(group) {
    groupFactory.removeGroup(group)
      .then(function(data) {
        if (data) {
          $scope.groups = data;
        } else {
          console.log('error');
        }
      }, function(error) {
          console.log('error');
      });
  }

  this.isUnhide = function(index) {
    return $scope.activeGroupIndex === index;
  }

  this.hideUnhide = function(index) {
    if ($scope.activeGroupIndex === index) {
        $scope.activeGroupIndex = null;
    }else{
        $scope.activeGroupIndex = index;
    }
  }


})