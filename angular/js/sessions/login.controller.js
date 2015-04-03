angular.module('thingz').controller('LoginController', function ($scope, $location, SessionsService) {
    $scope.register = function () {
        UsersService.create($scope.newUser)
            .success(function (user) {
                SessionsService.login($scope.newUser.username, $scope.newUser.password)
                    .then(function(response) {
                        $scope.$emit('login', SessionsService.getTokenPayload(response.data));
                        $scope.newUser = {};
                        $location.path('/');
                    });
            })
            .error(function (message) {
                console.log(message);
            });
    };

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

    $scope.newUser = {};
});
