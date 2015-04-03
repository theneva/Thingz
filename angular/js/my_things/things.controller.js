angular.module('thingz').controller('MyThingsController', function($scope, ThingsService) {
    ThingsService.query().success(function(things) {
        $scope.things = things;
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
