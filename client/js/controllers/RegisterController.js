app.controller('RegisterController',
    function($scope, $location, volunteerFactory, organizationFactory, userService) {
        console.log('Register for an account');

        $scope.orgClick = function() {
            $scope.userType = 'org';
        }

        $scope.volClick = function() {
            $scope.userType = 'vol';
        }
        
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
        u.$save(function(data){
            console.log("penis")
            userService.VolunteerLogin(newUser)
                .then(function(data) {
                    console.log(data);
                    var volId = data.id;
                    $location.path('/edit_volunteer_profile/' + volId)
                }, function(err) {
                    console.log('Error Logging in New User.')
                })
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
        
        var a = new organizationFactory(newOrg);
        a.$save(function(data){
            console.log("penis")
            userService.OrganizationLogin(newOrg)
            .then(function(data) {
                console.log(data);
                var orgId = data.id;
                $location.path('/edit_organization_profile/' + orgId);
            }, function(err) {
                console.log("Error logging in new Organization")
            })
        }, function(err){
            console.log('Penis error');
        });
    };

})
    