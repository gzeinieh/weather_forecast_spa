// module 
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);

// route

weatherApp.config(function($routeProvider){
    
    $routeProvider
    
    .when('/', {
        
        templateUrl : 'pages/home.htm',
        controller: 'homeController'
        
    })
    
    .when('/forecast', {
        
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController' 
    })
    
    
    .when('/forecast/:days', {
        
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController' 
    })
    
    
});

// service 
weatherApp.service('cityService',function(){
    
    this.city = "New York, NY";
})

// controllers

weatherApp.controller('homeController',['$scope','cityService', function($scope,cityService){
    
    $scope.city = cityService.city
    $scope.cityDyn = ""
    $scope.$watch('city',function(){
        
        
        cityService.city = $scope.city 
        $scope.cityDyn = $scope.city
    })
}]);

weatherApp.controller('forecastController',['$scope','$resource','$routeParams','cityService', function($scope,$resource,$routeParams,cityService){
    $scope.city = cityService.city;
    $scope.num = $routeParams.days || '2';                                      
    $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=YOURKEY",{callback: "JSON_CALLBACK"},{get:{method:"JSONP"}});
    $scope.weatherResult = $scope.weatherApi.get({q:$scope.city,cnt: $scope.num});
    
    $scope.convertToFahrenheit = function(degK){
        return Math.round((1.8*(degK - 273))+32);
        
    }
    
    $scope.convertDate = function(dt){
        
        return new Date(dt*1000);
    }
    
}]);


