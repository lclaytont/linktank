app.service('userService', 
    function($http, $location) {

    var user; 

    // Log Local Strategy Users in with email and pw
    this.login = function(obj) {
        return $http({
            method: 'POST',
            url: "http://localhost:3000/api/volunteers/login",
            data: obj
        }).then(function(success) {
            user = success.data;
            return success.data;
        })
    }

    // Log Out
    this.logout = function() {
        return $http({
            method: 'GET', 
            url: "http://localhost:3000/api/volunteers/logout"
        }).then(function() {
            user = undefined;
        })
    }

    // Maintain user session
    this.me = function() {
        if(user) {
            return Promise.resolve(user);
        }
        return $http({
            url: 'http://localhost:3000/api/volunteers/me' 
        }).then(function(success) {
            user = success.data;
            return success.data
        }) 
    }



})