angular.module('thingz').service('SessionsService', function ($http) {
    this.login = function (username, password) {
        var loginAttempt = {
            username: username,
            password: password
        };

        return $http.post('/api/sessions', loginAttempt)
            .success(function(token) {
                $http.defaults.headers.common['x-auth'] = token;
            });
    };

    this.logout = function () {
        delete $http.defaults.headers.common.Authorization;
    };
});
