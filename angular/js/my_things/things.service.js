angular.module('thingz').service('ThingsService', function($http) {
    this.query = function() {
        return $http.get('/api/things');
    };
});
