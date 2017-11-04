angular.module('app').factory('taskFactory', function($http, $q){

	return {

		getTasks: function(group) {
			return $http.get('http://localhost:27017/tasks/' + group._id)
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
			return $http.post('http://localhost:27017/tasks', task)
				.success(function(response) {
					console.log('task added');
				})
				.error(function(response) {
					console.log('task add error');
				});
		},

		removeTask: function(task) {
			return $http.delete('http://localhost:27017/tasks/' + task._id)
				.success(function(response) {
					console.log('task removed');
				})
				.error(function(response) {
					console.log('remove error');
				});
		},

		updateTask: function(task) {
			return $http.put('http://localhost:27017/tasks/' + task._id, task)
				.success(function(response) {
					console.log('task edited');
				})
				.error(function(response) {
					console.log('edit error');
				})
		}

	}

});