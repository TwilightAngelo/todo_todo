angular.module('app').factory('groupFactory', function($http, $q){
	
		return {
		
		getGroups: function() {
			return $http.get('http://localhost:27017/')
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

		addGroup: function(group) {
			//console.log('IN factory' + group);
			return $http.post('http://localhost:27017', group)
				.success(function(response) {
					console.log('post success ' + response);
				})
				.error(function(response) {
					console.log('post error');
				});
		},

		removeGroup: function(group) {
			//console.log(group);
			return $http.delete('http://localhost:27017/' + group._id)
				.success(function(response) {
					console.log('group removed');
				})
				.error(function(response) {
					console.log('remove error');
				});
		}

	}

});