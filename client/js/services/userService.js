app.service('userService', 
    function($http, $location) {

    var user; 

    // Log Local Strategy Users in with email and pw
    this.VolunteerLogin = function(obj) {
        return $http({
            method: 'POST',
            url: "http://localhost:3000/api/volunteers/login",
            data: obj
        }).then(function(success) {
            console.log(success);
            user = success.data;
            return success.data;
        })
    }

    this.OrganizationLogin = function(obj) {
        return $http({
            method: 'POST',
            url: "http://localhost:3000/api/organizations/login",
            data: obj
        }).then(function(success) {
            user = success.data;
            return success.data;
        })
    }


    // Log Out a vol
    this.VolunteerLogout = function() {
        console.log(user);
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
            console.log(success);
            user = success.data;
            return success.data
        }) 
    }
})