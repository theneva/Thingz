angular.module('thingz').controller('NewThingController', function($scope, ThingsService, LocationsService) {
    LocationsService.query().success(function(locations) {
        $scope.locations = locations;
    });

    $scope.newThing = {};

    $scope.saveThing = function() {
        ThingsService.save($scope.newThing)
            .success(function(thing) {
                $scope.newThing = {};
            })
            .error(function(message) {
                console.log(message);
            });
    };
});
