app.factory('volUpcomingEventsFactory', function($resource) {
    return $resource('http://localhost:3000/api/events/vols_events/upcoming/:id',
    {id: '@id'});
})