angular.module('thingz').controller('MyThingsController', function($scope, ThingsService) {
    ThingsService.query().success(function(things) {
        $scope.things = things;
    });
});
