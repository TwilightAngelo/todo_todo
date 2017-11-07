angular.module('app').factory('taskFactory', function($http, $q){

  var adress = 'http://185.221.152.183:13013/tasks/';

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

    removeTask: function(task) {
      return $http.delete(adress + task._id + '/' + task.groupId, {data : {gid:task.groupId}})
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

    updateTask: function(task) {
      return $http.put(adress + task._id, task)
        .then(function(response){
          if (typeof response.data === 'object') {
            return response.data;
          } else {
            return $q.reject(response.data);
          }
        }, function(response) {
          return $q.reject(response.data);
        })
    }

  }

});