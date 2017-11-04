angular.module('app').factory('taskFactory', function($http, $q){

	var adress = 'http://185.221.152.183:8080/tasks/';

	return {

		getTasks: function(group) {
			return $http.get(adress + group._id)
				.then(function(response){
					if (typeof response.data === 'object') {
						return response.data;
					} else {
						return $q.reject(response.data);
					}
				}, function(response) {
					return $q.reject(response.data);
				})
		},

		addTask: function(task) {
			return $http.post(adress, task)
				.success(function(response) {
					console.log('task added');
				})
				.error(function(response) {
					console.log('task add error');
				});
		},

		removeTask: function(task) {
			return $http.delete(adress + task._id)
				.success(function(response) {
					console.log('task removed');
				})
				.error(function(response) {
					console.log('remove error');
				});
		},

		updateTask: function(task) {
			return $http.put(adress + task._id, task)
				.success(function(response) {
					console.log('task edited');
				})
				.error(function(response) {
					console.log('edit error');
				})
		}

	}

});