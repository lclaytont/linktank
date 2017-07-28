app.controller('RegisterController',
    function($scope, $location, volunteerFactory, organizationFactory) {
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

     $scope.createOrg = function(){

            var newOrg = {
                email: $scope.orgEmail,
                name: $scope.orgName,
                password: $scope.orgPassword,
                contact: $scope.orgContact,
                contactPhone: $scope.orgContactPhone, 
                address: $scope.orgAddress1,
                city: $scope.orgCity,
                zip: $scope.orgZip,
                state: $scope.orgState
                // role: $scope.role
        }
        console.log(newOrg)
        
        var u = new organizationFactory(newOrg);
        u.$save(function(){
            console.log("penis")
            $location.path('/');
        }, function(err){
            console.log('Penis error');
        });
    };

})
    