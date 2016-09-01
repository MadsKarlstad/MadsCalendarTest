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


    $scope.facilities = [{
        "id" : "1",
        "availability" : ["08:00","09:00","10:00","11:00","12:00","13:00"],
        "rooms" :   [{"name" : "Northern Hall", "bookings" : [{"description" : "Football practice", "from" : "08:00", "to" : "09:00"},{"description" : "Handball practice", "from" : "10:00", "to" : "11:00"}]},
                    {"name" : "Southern Hall", "availability" : ["08:00","09:00","10:00","11:00","12:00","13:00"], "bookings" : [{"description" : "Football practice", "from" : "08:00", "to" : "09:00"}]}]
    }];



    //$scope.rooms = [{"name" : "Northern Hall", "availability" : ["08:00","09:00","10:00","11:00","12:00","13:00"], "bookings" : [{"description" : "Football practice", "from" : "08:00", "to" : "09:00"},{"description" : "Handball practice", "from" : "10:00", "to" : "11:00"}]}, {"name" : "Southern Hall", "availability" : ["08:00","09:00","10:00","11:00","12:00","13:00"], "bookings" : [{"description" : "Football practice", "from" : "08:00", "to" : "09:00"}]}];


    console.log($scope.facilities);

    $scope.message = 'Homework for Mads';

});