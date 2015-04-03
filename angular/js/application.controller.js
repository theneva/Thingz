angular.module('thingz').controller('ApplicationController', function ($scope, $location, SessionsService) {
    $scope.$on('$locationChangeStart', function () {
        if ($scope.currentUser) {
            return;
        }

        var storedToken = localStorage.token;
        if (storedToken) {
            SessionsService.restoreSession(storedToken);
            $scope.$emit('login', SessionsService.getTokenPayload(storedToken));
            $location.path('/'); // FIXME
            return;
        }

        var destination = $location.path();
        if (destination === '/login'
            || destination === '/register') {
            return;
        }

        $location.path('/login');
    });

    $scope.$on('login', function (event, user) {
        $scope.currentUser = JSON.parse(user);
        $location.path('/');
    });

    $scope.logout = function () {
        SessionsService.logout();
        delete $scope.currentUser;
        $location.path('/login');
    };
});
