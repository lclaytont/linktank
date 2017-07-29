app.controller('EditVolunteerProfileController', 
    function($scope, volunteerFactory, $routeParams) {
        $scope.newVol = volunteerFactory.get({id: $routeParams.id});

        $scope.updateVol = function(newVol) {
            console.log(newVol);
            
            // var vol = volunteerFactory.get({id: $routeParams.id});
            // vol.name = $scope.newVol.name;
            // vol.email = $scope.newVol.email;
            // vol.city = $scope.newVol.city;
            // vol.state = $scope.newVol.state;
            // vol.image = $scope.newVol.image;
            
            volunteerFactory.update({id: $routeParams.id}, newVol);
        }
    })