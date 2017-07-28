app.controller('RegisterController',
    function($scope, $location, volunteerFactory) {
        console.log('Register for an account');

        // this is going to be for vol.
        $scope.createVol = function(){
            var newUser = {
                email: $scope.volEmail,
                name: $scope.volName,
                password: $scope.volPassword
                // role: $scope.role
        }
        console.log(newUser)
        
        var u = new volunteerFactory(newUser);
        u.$save(function(){
            console.log("penis")
            $location.path('/');
        }, function(err){
            console.log('Penis error');
        });
    };
})
    