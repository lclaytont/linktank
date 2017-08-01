app.factory('eventFactory',
function($resource){
    return $resource('http://localhost:3000/api/events/:id', {id: '@id'},{'update':{method:'PUT'}}
    );
})