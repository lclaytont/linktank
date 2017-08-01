app.factory('volEventListFactory', 
    function($resource) {
        return $resource('http://localhost:3000/api/events/vols_events/:id', 
        {id: '@id'});
    })

// app.service('volEventListService', function($http) {

//     this.getVolsEvents = function(volId) {
//         $http.get('http://localhost:3000/api/events/vols_events/' + volId)
//             .then(function(success) {
//                 console.log(success.data);
//                 console.log('Got the events');
//                 return success;
//             }, function(err) {
//                 console.log('Could not grab the events')
//             })
//     }
// })