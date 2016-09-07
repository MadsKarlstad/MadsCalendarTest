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
                {"startDate" : moment().format("06-08-2016", "DD-MM-YYYY"), "endDate" : moment().format("30-10-2016", "DD-MM-YYYY"), "startHour" : moment().format("08:00", "HH:mm"), "endHour" : "14:00"},
                {"startDate" : moment().format("31-12-2016", "DD-MM-YYYY"), "endDate" : moment().format("01-02-2017","DD-MM-YYYY"), "startHour" : moment().format("08:00", "HH:mm"), "endHour" : "18:00"}
            ],
            "rooms" :   [
                {"id": "1", "name" : "Northern Hall", "bookings" : [
                    /**{"description" : "Football practice", "date" : date, "from" : "08:00", "to" : "09:00", "roomID" : "1"},
                    {"description" : "Handball practice", "date" : date, "from" : "10:00", "to" : "11:00", "roomID" : "1"},
                    {"description" : "Conference", "date" : moment(date, 'DD-MM-YYYY').add(1,'d').format('DD-MM-YYYY'), "from" : "08:00", "to" : "09:00", "roomID" : "1"},
                    {"description" : "Bandy practice", "date" : moment(date, 'DD-MM-YYYY').add(2,'d').format('DD-MM-YYYY'), "from" : "08:00", "to" : "09:00", "roomID" : "1"},
                    {"description" : "Futsal practice", "date" : moment(date, 'DD-MM-YYYY').add(2,'d').format('DD-MM-YYYY'), "from" : "09:00", "to" : "10:00", "roomID" : "1"}**/
                ]},
                {"id": "2", "name" : "Southern Hall", "bookings" : [

                    /**{"description" : "Bandy practice", "date" : date, "from" : "08:00", "to" : "09:00", "roomID" : "2"},
                    {"description" : "Football practice", "date" : moment(date, 'DD-MM-YYYY').add(1,'d').format('DD-MM-YYYY'), "from" : "08:00", "to" : "09:00", "roomID" : "2"},
                    {"description" : "Badminton practice", "date" : moment(date, 'DD-MM-YYYY').add(2,'d').format('DD-MM-YYYY'), "from" : "08:00", "to" : "09:00", "roomID" : "2"},
                    {"description" : "Dodgeball match", "date" : moment(date, 'DD-MM-YYYY').add(2,'d').format('DD-MM-YYYY'), "from" : "09:00", "to" : "10:00", "roomID" : "2"}**/
                ]}
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
                        hourArray.push(startHour);
                        startHour = moment(startHour, "H").add(1,'hours').hours();

                    }
                    return hourArray;
                }


                /**else {
                    return [];
                }**/
            }
        },
        populateBookings: function (value) {
            var hourArray = value;
            var descriptionArray = ["","","","Football","Handball","Futsal","Volleyball","Conference","Dodgeball"];

            for(i = 0; i < facilities[0].rooms.length; i++){
                console.log(facilities[0].rooms[i].name);
                for (j = 0; j < hourArray.length; j++){
                    var booking = {"description": descriptionArray[Math.floor(Math.random() * descriptionArray.length)], "date" : date, "from" : hourArray[j], "to" : "", "roomID" : i+1};
                    facilities[0].rooms[i].bookings.push(booking);
                }
            }
            //var booking = {"description": descriptionArray[Math.floor(Math.random() * descriptionArray.length)], "date" : date, "from" : "08:00", "to" : "09:00", "roomID" : "2"};
            //facilities[0].rooms[1].bookings.push(booking);
            //console.log(facilities[0].rooms[1].bookings);
            return true;

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
        }
    }
});
// create the controller
calendarApp.controller('calendarController', function ($scope, sharedProperties) {

    $scope.init = function () {
        $scope.date = sharedProperties.getDate();
        $scope.day = sharedProperties.getDay();
        $scope.facilities = sharedProperties.getFacilities();
        console.log(sharedProperties.getFacilities());
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
    };

    $scope.message = 'Homework for Mads';

});