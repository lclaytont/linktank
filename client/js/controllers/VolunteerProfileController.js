app.controller('VolunteerProfileController', ['$scope', 'volunteerFactory', '$routeParams', 'volEventListFactory',
    function($scope, volunteerFactory, $routeParams, volEventListFactory) {
        console.log('Vol Profile Loaded');

        // volunteer facotry 
        //events factory

        $scope.volunteer = volunteerFactory.get({id: $routeParams.id})
        console.log($scope.volunteer);

        $scope.volEvents = volEventListFactory.query({id: $routeParams.id});
        // console.log(volEvents);
        // $scope.volEvents = volEvents;
        console.log($scope.volEvents);
    }]);