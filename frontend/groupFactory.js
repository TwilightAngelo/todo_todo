angular.module('app').factory('groupFactory', function($http, $q){

		var adress = 'http://185.221.152.183:13013/';
	
		return {
		
		getGroups: function() {
			return $http.get(adress)
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
			return $http.post(adress, group)
				.success(function(response) {
					console.log('post success ' + response);
				})
				.error(function(response) {
					console.log('post error');
				});
		},

		removeGroup: function(group) {
			//console.log(group);
			return $http.delete(adress + group._id)
				.success(function(response) {
					console.log('group removed');
				})
				.error(function(response) {
					console.log('remove error');
				});
		}

	}

});
