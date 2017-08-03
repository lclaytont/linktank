app.factory('organizationPastEventsFactory',
    function ($resource) {
        return $resource('$http://localhost:3000/api/events/past/:id',
            { id: '@id' });
    })