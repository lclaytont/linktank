app.factory('organizationUpcomingEventsFactory',
    function ($resource) {
        return $resource('http://localhost:3000/api/events/upcoming/:id', { id: '@id' }, { 'update': { method: 'POST' } }
        );
    })

