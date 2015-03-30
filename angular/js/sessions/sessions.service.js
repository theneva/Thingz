angular.module('thingz').service('SessionsService', function ($http) {
    this.login = function (username, password) {
        return {
            success: function (cb) {
                cb();
            }
        };
    };

    this.logout = function () {
        delete $http.defaults.headers.common.Authorization;
    };
});
