app.controller('VolunteerLogoutController',
    function ($scope, $route, $location, userService) {
        userService.me();
        console.log('Log out of an account');

        $scope.logout = function () {   
            userService.VolunteerLogout()
                .then(function () {
                    console.log('logged out!');
                    $location.path('/');
                    alert('You have been logged out!');
                }, function (err) {
                    console.log(err);
                })
        }
    })


