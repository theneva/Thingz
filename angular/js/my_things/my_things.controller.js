angular.module('thingz').controller('MyThingsController', function($scope, MyThingsService) {
    $scope.things = 'hi';

    MyThingsService.query().success(function(things) {
        $scope.things = things;
    });
});
