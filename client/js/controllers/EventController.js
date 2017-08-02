app.controller('EventController',
function($scope, organizationUpcomingEventsFactory, $routeParams){
    console.log('Events Page Loaded');


// events factory

$scope.upcomingEvents = organizationUpcomingEventsFactory.query();
console.log($scope.upcomingEvents);

});