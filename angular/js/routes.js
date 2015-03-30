angular.module('thingz').config(function ($routeProvider) {
    $routeProvider
        .when('/login', {controller: 'LoginController', templateUrl: '/login.html'})
        .otherwise({controller: 'NotFoundController', templateUrl: '/not_found.html'});
});
