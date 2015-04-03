angular.module('thingz').controller('ThingController', function($scope, $routeParams, ThingsService) {
    ThingsService.get($routeParams.id)
        .success(function(thing) {
            $scope.thing = thing;
        });
});
