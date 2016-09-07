/**
 * Created by madsmkarlstad on 9/1/16.
 */

// create the module
var calendarApp = angular.module('calendarApp',['ngRoute']);

//create routing
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

//create the service
calendarApp.service('sharedProperties', function() {
    var date = moment().format('DD-MM-YYYY');
    var day = moment().format('dddd');
    var facilities = [
        {"id" : "1",
            "" : {},
            "availability" : [
                {"startDate" : "06-08-2016", "endDate" : "30-10-2016", "startHour" : "08:00", "endHour" : "15:00"},
                {"startDate" : "31-12-2016", "endDate" : "01-02-2017", "startHour" : "08:00", "endHour" : "18:00"}
            ],
            "rooms" :   [
                {"id": "1", "name" : "Northern Hall", "bookings" : []},
                {"id": "2", "name" : "Southern Hall", "bookings" : []}
            ]
        }
    ];

    return {
        //returns the date
        getDate: function () {
            return date;
        },
        //sets the date
        setDate: function (value) {
            date = value;
        },
        //returns the day
        getDay: function () {
            return day;
        },
        //sets the day
        setDay: function (value) {
            day = value;
        },
        //returns the facility object
        getFacilities: function () {
            return facilities;
        },
        getDateRange: function () {

            for (i = 0; i < facilities[0].availability.length; i++){

                var startDate = facilities[0].availability[i].startDate,
                    endDate = facilities[0].availability[i].endDate;
                var startUnix = moment(startDate).valueOf(),
                    endUnix = moment(endDate).valueOf(),
                    dateUnix = moment(date).valueOf();

                /**console.log(startUnix);
                console.log(dateUnix);
                console.log(endUnix);**/

                if(dateUnix > startUnix){
                    var hourArray = new Array();
                    var startHour = moment(facilities[0].availability[i].startHour, 'H').hours();
                    var endHour = moment(facilities[0].availability[i].endHour, 'H').hours();
                    while (startHour <= endHour) {
                        hourArray.push(startHour + ":00");
                        startHour = moment(startHour, "H").add(1,'hours').hours();

                    }
                    return hourArray;
                }


                else {
                    return [];
                }
            }
        },
        populateBookings: function (hour_Array) {
            var hourArray = hour_Array;
            var descriptionArray = ["","","","Football","Handball","Futsal","Volleyball","Conference","Dodgeball"];
            var dateArray = ["07-08-2016","08-08-2016","09-08-2016","10-08-2016","11-08-2016","12-08-2016","13-08-2016","14-08-2016","15-08-2016","16-08-2016"];

            if (facilities[0].rooms[0].bookings.length != 0 && facilities[0].rooms[1].bookings.length != 0) {
                return;
            }

            for(i = 0; i < facilities[0].rooms.length; i++) {
                for (j = 0; j < hourArray.length; j++) {
                    var booking = {"description": descriptionArray[Math.floor(Math.random() * descriptionArray.length)], "date" : date, "from" : hourArray[j], "to" : moment(hourArray[j], "H").add(1,'hours').hours() + ":00", "roomID" : i+1, "booked":"true"};
                    if(booking.description == "") {
                        booking.booked = "false";
                    }
                    facilities[0].rooms[i].bookings.push(booking);
                }
            }
            return;
        },
        //returns the bookings for a given date
        getBookingsBasedOnDate: function () {
            var room1 = {"id": "1", "name" : "Northern Hall", "bookings" : []};
            var room2 = {"id": "2", "name" : "Southern Hall", "bookings" : []};
            var roomTemp = [];
            roomTemp.push(room1,room2);
            var counter = 0;
            for (i = 0; i < facilities[0].rooms.length; i++) {
                for (j = 0; j < facilities[0].rooms[i].bookings.length; j++) {
                    if (facilities[0].rooms[i].bookings[j].date == date) {
                        roomTemp[i].bookings.push(facilities[0].rooms[i].bookings[j]);
                        counter++;
                    }
                }
            }
            return roomTemp;
        },
        checkIfBookIsValid: function (value) {
            if (value.booked == "false") {
                console.log("Available from " + value.from + " to " + value.to);
            }
            else {
                console.log("Room unavailable at the given time")
            }
        }
    }
});

// create the controller
calendarApp.controller('calendarController', function ($scope,$http, sharedProperties) {

    $scope.init = function () {
        $scope.date = sharedProperties.getDate();
        $scope.day = sharedProperties.getDay();
        $scope.facilities = sharedProperties.getFacilities();
        $scope.hourRange = sharedProperties.getDateRange();
        sharedProperties.populateBookings(sharedProperties.getDateRange());
        $scope.bookingsBasedOnDate = sharedProperties.getBookingsBasedOnDate();
    };

    $scope.nextDay = function () {
        $scope.day = sharedProperties.setDay(moment(sharedProperties.getDate(), 'DD-MM-YYYY').add(1,'d').format('dddd'));
        $scope.date = sharedProperties.setDate(moment(sharedProperties.getDate(), 'DD-MM-YYYY').add(1,'d').format('DD-MM-YYYY'));
        $scope.facilities = sharedProperties.getBookingsBasedOnDate();
    };

    $scope.prevDay = function () {
        $scope.day = sharedProperties.setDay(moment(sharedProperties.getDate(), 'DD-MM-YYYY').subtract(1,'d').format('dddd'));
        $scope.date = sharedProperties.setDate(moment(sharedProperties.getDate(), 'DD-MM-YYYY').subtract(1,'d').format('DD-MM-YYYY'));
        $scope.facilities = sharedProperties.getBookingsBasedOnDate();
    };

    $scope.book = function (obj){
        sharedProperties.checkIfBookIsValid(obj);
    }

    $scope.message = 'Homework for Mads';

});