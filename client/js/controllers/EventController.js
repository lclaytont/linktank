app.controller('EventController',
function($scope, organizationUpcomingEventsFactory, $routeParams, $http){
    console.log('Events Page Loaded');

$scope.upcomingEvents = organizationUpcomingEventsFactory.query();
console.log($scope.upcomingEvents);

$scope.volunteer = function(event) {
    console.log(event)
    $http({
        method: 'POST',
        url: '/api/events/volunteer_for_event/' + event.id,

    }).then(function() {
        console.log('Volunteered for event');
        alert("Thank you for signing up for an event!")
    }, function(err) {
        console.log('Could not volunteer for event: ' + err.message);
        alert('You are already signed up for this event. Spread your charity to another event!')
    })    
}



});