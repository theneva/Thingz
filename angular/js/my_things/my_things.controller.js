angular.module('thingz').controller('MyThingsController', function($scope, MyThingsService) {
    MyThingsService.query().success(function(things) {
        $scope.things = things;
    });
});
