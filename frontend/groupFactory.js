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
      return $http.post(adress, group)
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

    removeGroup: function(group) {
      //console.log(group);
      return $http.delete(adress + group._id)
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