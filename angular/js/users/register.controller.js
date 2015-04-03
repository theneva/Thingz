angular.module('thingz').controller('RegisterController', function ($scope, $location, UsersService, SessionsService) {
    $scope.message = 'hi';

    $scope.newUser = {};

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
    }
});
