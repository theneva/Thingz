angular.module('thingz').config(function ($routeProvider) {
    $routeProvider
        .when('/', {controller: 'MyThingsController', templateUrl: '/things/list.html'})
        .when('/things/:id', {controller: 'ThingController', templateUrl: '/things/show.html'})
        .when('/new-thing', {controller: 'NewThingController', templateUrl: '/things/new.html'})
        .when('/register', {controller: 'RegisterController', templateUrl: '/users/register.html'})
        .when('/login', {controller: 'LoginController', templateUrl: '/login.html'})
        .otherwise({controller: 'NotFoundController', templateUrl: '/not_found.html'});
});
