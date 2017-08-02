app.factory('organizationFactory', 
    function($resource) {
        return $resource('http://localhost:3000/api/organizations/:id', {id: '@id'}, {'update': {method: 'PUT'}}
        );
    })