app.controller('VolunteerProfileController',
    function($scope, volunteerFactory, $routeParams) {
        console.log('Vol Profile Loaded');

        // volunteer facotry 
        //events factory

        $scope.volunteer = volunteerFactory.get({id: $routeParams.id})

        console.log($scope.volunteer);


    })