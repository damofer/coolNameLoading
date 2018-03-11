var app = angular.module('app', ['ngRoute']);



// configure our routes
app.config(function($routeProvider) {
    $routeProvider
    // route for the home page


        .when('/', {
        controller: 'mainController',
        controllerAs: 'vm',
        templateUrl: 'templates/login.html'
        })
        .when('/login', {
        controller: 'mainController',
        controllerAs: 'vm',
        templateUrl: 'templates/login.html'
        })
        .when('/signup', {
        controller: 'mainController',
        controllerAs: 'vm',
        templateUrl: 'templates/signup.html'
        })

        .when('/dashboard', {
        controller: 'dashboardCtrl',
        controllerAs: 'vm',
        templateUrl: 'templates/menu.html'
       
        })
        .when('/profile', {
        controller: 'dashboardCtrl',
        controllerAs: 'vm',
        templateUrl: 'templates/profile.html'
       
        })
        .when('/task/:id', {
        controller: 'taskController',
        controllerAs: 'vm',
        templateUrl: 'templates/task.html'
        
        })
        .when('/summary', {
        controller: 'summaryController',
        controllerAs: 'vm',
        templateUrl: 'templates/summary.html'
        
        })
        .when('/events', {
        controller: 'eventController',
        controllerAs: 'vm',
        templateUrl: 'templates/events.html'
        
        })
        .otherwise({
        redirectTo: '/'
        });
   
       
});
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);



 