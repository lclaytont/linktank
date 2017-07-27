app.directive('mainNav',
    function() {
        return {
            restrict: 'E',
            templateUrl: 'views/mainNav.html'
        }
    });

app.directive('volunteerNav', 
    function() {
        return {
            restrict: 'E',
            templateUrl: 'views/volunteerNav.html'
        }
    }); 

app.directive('organizationNav', 
    function() {
        return {
            restric: 'E',
            templateUrl: 'views/organizationNav.html'
        }
    });