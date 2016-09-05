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

    var date = moment().format('DD-MM-YYYY');
    $scope.date = date;
    var day = moment().format('dddd');
    $scope.day = day;

    $scope.facilities = [
        {"id" : "1",
        "availability" : ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00"],
        "rooms" :   [
            {"name" : "Northern Hall", "bookings" : [
                {"description" : "Football practice", "date" : date, "from" : "08:00", "to" : "09:00"},
                {"description" : "Handball practice", "date" : date, "from" : "10:00", "to" : "11:00"},
                {"description" : "Conference", "date" : moment(date, 'DD-MM-YYYY').add('d',1).format('DD-MM-YYYY'), "from" : "10:00", "to" : "11:00"}
            ]},
            {"name" : "Southern Hall", "bookings" : [
                {"description" : "Bandy practice", "date" : date, "from" : "08:00", "to" : "09:00"}
            ]}
        ]}
    ];

    $scope.changeDay = function (dato) {
        date = dato;

    };

    $scope.test = function () {
      console.log("Halla verden")
    };

    $scope.message = 'Homework for Mads';

});