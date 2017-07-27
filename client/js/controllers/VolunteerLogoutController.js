app.controller('VolunteerLogoutController',
    function($scope, $route, userService) {
        userService.me();
        console.log('Log out of an account');

        $scope.logoutVolunteer = function(){   //on ngclick in volunteerLogout.html run this
            userService.VolunteerLogout()
            .then(function(){
                console.log('logged out!');
                $location.path('/');
                 alert('You have been logged out!');
        }, function(err) {
            console.log(err);
        })  
    }

    })


