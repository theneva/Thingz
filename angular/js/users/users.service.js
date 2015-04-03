angular.module('thingz').service('UsersService', function($http) {
    this.create = function(newUser) {
        return $http.post('/api/users', newUser);
    };
});
