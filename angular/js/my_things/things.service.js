angular.module('thingz').service('ThingsService', function($http) {
    this.query = function() {
        return $http.get('/api/things');
    };

    this.save = function(thing) {
        return $http.post('/api/things', thing);
    };
});
