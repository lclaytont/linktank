app.controller('VolunteerProfileController', ['$scope', 'volunteerFactory', '$routeParams', 'volEventListFactory',
    function($scope, volunteerFactory, $routeParams, volEventListFactory) {
        console.log('Vol Profile Loaded');
        
             //this returns the users info
        $scope.volunteer = volunteerFactory.get({id: $routeParams.id})
        console.log($scope.volunteer);

            // this returns the events that the user is signed up for
        $scope.volEvents = volEventListFactory.query({id: $routeParams.id});
        console.log($scope.volEvents);
    }]);