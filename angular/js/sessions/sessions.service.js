angular.module('thingz').service('SessionsService', function ($http) {
    var service = this;

    service.login = function (username, password) {
        var loginAttempt = {
            username: username,
            password: password
        };

        return $http.post('/api/sessions', loginAttempt)
            .success(function (token) {
                localStorage.token = token;
                $http.defaults.headers.common['x-auth'] = token;
            });
    };

    service.logout = function () {
        delete localStorage.token;
        delete $http.defaults.headers.common['x-auth'];
    };

    service.restoreSession = function(token) {
        $http.defaults.headers.common['x-auth'] = token;
    };

    service.getTokenPayload = function(token) {
        return atob(token.split('.')[1]);
    };
});
