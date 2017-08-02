app.factory('volunteerForEventFactory', function($resource) {
    return $resource('https://localhost:3000/api/events/volunteer_for_event/:id',
    {id: '@id'});
})