angular.module('thingz').config(function ($routeProvider) {
    $routeProvider
        .when('/', {controller: 'MyThingsController', templateUrl: '/my_things.html'})
        .when('/login', {controller: 'LoginController', templateUrl: '/login.html'})
        .otherwise({controller: 'NotFoundController', templateUrl: '/not_found.html'});
});
