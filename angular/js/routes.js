angular.module('thingz').config(function ($routeProvider) {
    $routeProvider
        .when('/', {controller: 'MyThingsController', templateUrl: '/my_things.html'})
        .when('/new-thing', {controller: 'NewThingController', templateUrl: '/new_thing.html'})
        .when('/login', {controller: 'LoginController', templateUrl: '/login.html'})
        .otherwise({controller: 'NotFoundController', templateUrl: '/not_found.html'});
});
