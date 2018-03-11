// create the controller and inject Angular's $scope
app.controller('eventController', function($scope,$http) {  
     $(function() {
        
        
        $scope.events= [];
        $http.get('./data/dummyData.json').then(function(response){
            console.log(response.data.events);
            $scope.events  = response.data.events; 
                

        });
    });


});