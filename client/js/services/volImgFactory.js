app.factory('volImgFactory', function($resource) {
    return $resource('http://localhost:3000/api/volunteers/profile_picture/:id',
    {id:'@id'}),
    {'update': {method: 'PUT'}}
})