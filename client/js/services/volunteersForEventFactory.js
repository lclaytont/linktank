app.factory('volunteersForEventFactory', function ($resource) {
    return $resource('https://localhost:3000/api/events/event_vols/:id',
        { id: '@id' });
})