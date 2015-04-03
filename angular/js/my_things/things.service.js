angular.module('thingz').service('ThingsService', function ($http) {
    this.query = function () {
        return $http.get('/api/things');
    };

    this.get = function (id) {
        return $http.get('/api/things/' + id);
    };

    this.save = function (thing) {
        return $http.post('/api/things', thing);
    };

    this.remove = function (id) {
        return $http.delete('/api/things/' + id);
    };
});
