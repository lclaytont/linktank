app.controller('VolunteerProfileController',
    function($scope, volunteerFactory, $routeParams) {
        console.log('Vol Profile Loaded');

        // volunteer facotry 
        //events factory

        $scope.vols = volunteerFactory.get({id: 2})

        console.log($scope.vols);


    })