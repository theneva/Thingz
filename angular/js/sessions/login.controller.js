angular.module('thingz').controller('LoginController', function ($scope, $location, SessionsService) {
    $scope.login = function (username, password) {
        SessionsService.login(username, password)
            .then(function () {
                $scope.$emit('login', username);
                $location.path('/');
            });
    };

    $scope.logout = function () {
        SessionsService.logout();
    };
});
