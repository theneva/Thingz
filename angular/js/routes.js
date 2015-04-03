angular.module('thingz').config(function ($routeProvider) {
    $routeProvider
        .when('/', {controller: 'MyThingsController', templateUrl: '/things/list.html'})
        .when('/new', {controller: 'NewThingController', templateUrl: '/things/new.html'})
        .when('/login', {controller: 'LoginController', templateUrl: '/login.html'})
        .when('/:id', {controller: 'ThingController', templateUrl: '/things/show.html'})
        .otherwise({controller: 'NotFoundController', templateUrl: '/not_found.html'});
});
