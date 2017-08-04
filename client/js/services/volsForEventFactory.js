app.factory('volsForEventFactory', function($resource) {
    return $resource('http://localhost:3000/api/events/event_vols/:id', 
    {id : '@id'});
})