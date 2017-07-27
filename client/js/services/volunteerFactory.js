app.factory('volunteerFactory', 
    function($resource) {
        return $resource('http://localhost:3000/api/volunteers/:id',
             {id: '@id'});
    })