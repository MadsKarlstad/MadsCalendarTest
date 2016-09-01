/**
 * Created by madsmkarlstad on 9/1/16.
 */

// create the module
var calendarApp = angular.module('calendarApp',['ngRoute']);

calendarApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl:    'pages/calendarView.html',
            controller:     'calendarController'
        })
        .when('/about', {
            templateUrl:    'pages/about.html',
            controller:     'calendarController'
        });
});

// create the controller
calendarApp.controller('calendarController', function ($scope) {

    $scope.rooms = [{"name" : "Northern Hall", "bookings" : [{"description" : "Fotballtrening", "from" : 8, "to" : 9}]}, {"name" : "Southern Hall"}];

    console.log($scope.rooms);

    $scope.message = 'Hello world';

});