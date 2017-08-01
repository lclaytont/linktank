app.controller('OrganizationProfileController',
    function ($scope, $routeParams, organizationFactory) {
        console.log('Welcome to an orgs profile!')

        $scope.organization = organizationFactory.get({ id: $routeParams.id })

        console.log($scope.organization);


    
    })

    