app.controller('OrganizationProfileController',
    function ($scope, $routeParams, organizationFactory, organizationUpcomingEventsFactory) {
        console.log('Welcome to an orgs profile!')

        $scope.organization = organizationFactory.get({ id: $routeParams.id });
        console.log($scope.organization);

        $scope.orgEvents = organizationUpcomingEventsFactory.query({ id: $routeParams.id });
        console.log($scope.orgEvents);


        $scope.details = function(o){   
            $scope.singleEvent = (o);
            console.log(o);
        }
        



        // for making a new event
        // $scope.createEvent = function () {
        //     var newEvent = {
        //         title: $scope.title,
        //         description: $scope.description,
        //         helpNeded: $scope.helpNeeded,
        //         startTime: $scope.startTime,
        //         endTime: $scope.endTime,
        //         totalHours: $scope.totalHours
        //     }
        //     console.log(newEvent);

        //     var u = new organizationUpcomingEventsFactory(newEvent);
        //     u.$save(function (data) {
        //         console.log("penis")
        //         organizationUpcomingEventsFactory(newEvent)
        //             .then(function (data) {
        //                 console.log(data);
        //             }, function (err) {
        //                 console.log('Could not make a new event.')
        //             })
        //     }, function (err) {
        //         console.log('another fucking error');
        //     });
        // };






    })


