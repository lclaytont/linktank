applicationCache.controller('EventController'), ['$scope','eventFactory',
function($scope, eventFactory, $routeParams){
    console.log('Events Page Loaded');
}]

// events factory

$scope.allEvents = eventFactory.get({id: $routeParams.id})
console.log($scope.allEvents);