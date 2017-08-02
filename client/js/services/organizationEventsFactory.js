app.factory('organizationEventsFactory',
    function ($resource) {
        return $resource('http://localhost:3000/api/events/organization/:id', { id: '@id' }, {'update': {method : 'POST'}}
        );
    })