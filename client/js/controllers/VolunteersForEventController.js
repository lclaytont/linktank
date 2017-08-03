app.controller('VolunteersForEventController',
    function ($scope, volunteersForEventFactory) {
        console.log('Display volunteers for an event');

        $scope.volForEvent = volunteersForEventFactory.query();
        console.log($scope.volForEvent);
    })