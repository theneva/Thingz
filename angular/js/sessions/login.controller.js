angular.module('thingz').controller('LoginController', function ($scope, $location, SessionsService) {
    $scope.login = function (username, password) {
        SessionsService.login(username, password)
            .then(function (response) {
                var token = response.data;
                var user = SessionsService.getTokenPayload(token);
                $scope.$emit('login', user);
                $location.path('/');
            });
    };

    $scope.logout = function () {
        SessionsService.logout();
    };
});
