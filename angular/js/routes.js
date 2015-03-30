angular.module('thingz').config(function ($routeProvider) {
    $routeProvider
        .otherwise({controller: 'NotFoundController', templateUrl: '/not_found.html'});
});
