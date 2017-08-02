app.controller('EventController'), ['$scope','organizationUpcomingEvents',
function($scope, eventFactory, $routeParams){
    console.log('Events Page Loaded');
}]

// events factory

$scope.organizationUpcomingEvents = organizationUpcomingEventsFactory.get [] 
console.log($scope.UpcomingEvents);