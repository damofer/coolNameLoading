(function() {
  'use strict';
    angular
    .module('app')
  .service('dataService', function($http) {
  	  var base_uri = 'http://localhost:3000';
      this.isLoggedIn = function (callback) {
         $http.get(base_uri + '/isLoggedIn')
         .then(callback);
      };
      this.getTicket = function (id,callback) {
         $http.get(base_uri + '/getTicket/'+id)
         .then(callback);
      };
   
      this.getAllMovies = function (callback) {
         $http.get(base_uri + '/getAllMovies')
         .then(callback);
      };
      this.getAllLogs = function (callback) {
         $http.get(base_uri + '/getAllLogs')
         .then(callback);
      };
      this.newLog = function (log,callback,err) {
         $http.post(base_uri + '/newLog',log)
         .then(callback,err);
      };

    
  });

})();










