angular.module('thingz').service('MyThingsService', function($http) {
    this.query = function() {
        return $http.get('/api/my-things');
    };
});
