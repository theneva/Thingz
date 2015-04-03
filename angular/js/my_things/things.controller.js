angular.module('thingz').controller('MyThingsController', function($scope, ThingsService, LocationsService) {
    ThingsService.query().success(function(things) {
        $scope.things = things;
    });

    LocationsService.query().success(function(locations) {
        $scope.locations = locations;
    });

    $scope.newThing = {};

    $scope.saveThing = function() {
        ThingsService.save($scope.newThing)
            .success(function(thing) {
                $scope.things.unshift(thing);
                $scope.newThing = {};
            });
    };

    $scope.removeThing = function(id) {
        ThingsService.remove(id)
            .success(function() {
                _.remove($scope.things, function(thing) {
                    return thing._id === id;
                });
            });
    };
});
