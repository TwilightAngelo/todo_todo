var module = angular.module('app', []);

module.controller('groupsCtrl', function(groupFactory, $scope){

	groupFactory.getGroups()
		.then(function(data) {
			if (data) {
				$scope.groups = data;
				console.log(data);
			} else {
				console.log('error');
			}
		}, function(error) {
					console.log('error');
	});

	this.getGroups =  function() {
		console.log('get groups');
		groupFactory.getGroups()
		.then(function(data) {
			if (data) {
				$scope.groups = data;
				//console.log(this.groups);
			} else {
				console.log('error');
			}
		}, function(error) {
					console.log('error');
		});
	};

	$scope.fetch = function(str) {
		return str.replace(/\s+/g, '_');
	}

	this.addGroup = function(group) {
		groupFactory.addGroup(group);
		window.location.reload();
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
					//console.log(this.tasks);
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
		taskFactory.addTask(newTask);
		window.location.reload();
	}

	this.removeTask = function(task) {
		window.location.reload();
		taskFactory.removeTask(task);
	}

	this.updateTask = function(task) {
		var newTask = { _id : this.currentTask._id,
										title : this.task.title,
										description : this.task.description,
						  			groupId : this.currentTask.groupId
		}
		taskFactory.updateTask(newTask);
		window.location.reload();
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
		//console.log(group);
		taskFactory.getTasks(group)
			.then(function(data){
				if (data) {
					//console.log(data);
					$scope.data = data;
					return data;
					//console.log(this.tasks);
				} else {
					console.log('error');
				}
			}, function(error) {
				console.log('error');
			});
	}

	this.removeGroup = function(group) {
		//console.log(group);
		window.location.reload();
		groupFactory.removeGroup(group);
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