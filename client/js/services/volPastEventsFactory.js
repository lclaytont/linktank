app.factory('volPastEventsFactory', function($resource) {
    return $resource('http://localhost:3000/api/events/vols_events/past/:id',
    {id: '@id'});
})