angular.module('thingz').controller('NewThingController', function($scope, ThingsService) {
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
