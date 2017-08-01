app.controller('OrganizationProfileController',
    function ($scope, $routeParams, organizationFactory, organizationEventsFactory) {
        console.log('Welcome to an orgs profile!')

        $scope.organization = organizationFactory.get({ id: $routeParams.id });
        console.log($scope.organization);

        $scope.orgEvents =organizationEventsFactory.query({id: $routeParams.id});
        console.log($scope.orgEvents);
    
    })

    