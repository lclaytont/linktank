app.controller('OrganizationProfileController',
    function ($scope, $routeParams, organizationFactory, organizationEventsFactory) {
        console.log('Welcome to an orgs profile!')

        $scope.organization = organizationFactory.get({ id: $routeParams.id });
        console.log($scope.organization);

        $scope.orgEvents = organizationEventsFactory.query({ id: $routeParams.id });
        console.log($scope.orgEvents);

        // for making a new event
        $scope.createEvent = function () {
            var newEvent = {
                title: $scope.title,
                description: $scope.description,
                helpNeded: $scope.helpNeeded,
                startTime: $scope.startTime,
                endTime: $scope.endTime,
                totalHours: $scope.totalHours
            }
            console.log(newEvent);

            var u = new organizationEventsFactory(newEvent);
            u.$save(function (data) {
                console.log("penis")
                organizationEventsFactory(newEvent)
                    .then(function (data) {
                        console.log(data);
                    }, function (err) {
                        console.log('Could not make a new event.')
                    })
            }, function (err) {
                console.log('another fucking error');
            });
        };






    })


