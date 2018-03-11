(function() {
  'use strict';
  angular.module('app')

// this controller will handle the auth
.controller('mainController',function($scope,dataService,$location,$window, $http){
    $scope.user =undefined;

    // create a message to display in our view

    function successCallback(response) {
        //success code
        console.log(response.data);
        $scope.main_info = response.data;
    }

    function errorCallback(error) {
        //error code
        console.log(error);
    }

    $scope.isLoggedIn = function(){

        dataService.isLoggedIn(function(response){  
        /*if the user is already logged in, redirect to the dashboard and asign its data to the $scope*/    
            if(response.data.id){
                if(window.location !="/#/dashboard"){
                    window.location = "/#/dashboard";
                }
                $scope.user = response.data;
                $http.get('./data/dummyData.json').then(successCallback, errorCallback);

                $scope.main_info={};



            }
           

         });
    }
    $scope.isLoggedIn();
});

})();