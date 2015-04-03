angular.module('thingz').service('LocationsService', function ($http) {
    this.query = function () {
        return $http.get('/api/locations');
    };

    this.save = function(location) {
        return $http.post('/api/locations', location);
    };

    this.remove = function(id) {
        return $http.delete('/api/locations/' + id);
    };
});
