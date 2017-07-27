app.directive('volunteerNav', 
    function($scope) {
        return {
            restrict: 'E',
            templateUrl: 'views/volunteerNav.html'
        }
    }); 

app.directive('organizationNav', 
    function($scope) {
        return {
            restric: 'E',
            templateUrl: 'views/organizationNav.html'
        }
    });