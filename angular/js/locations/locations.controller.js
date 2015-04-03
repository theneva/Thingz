angular.module('thingz').controller('LocationsController', function($scope, LocationsService) {
    LocationsService.query()
        .success(function(locations) {
            $scope.locations = locations;
        });

    $scope.newLocation = {};

    $scope.saveLocation  = function() {
        LocationsService.save($scope.newLocation)
            .success(function(location) {
                $scope.locations.unshift(location);
                $scope.newLocation = {};
            });
    };

    $scope.removeLocation = function(id) {
        LocationsService.remove(id)
            .success(function() {
                console.log('success');
                _.remove($scope.locations, function(location) {
                    return location._id === id;
                });
            });
    };
});
