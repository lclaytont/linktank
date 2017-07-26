//  --> ngApp = 'LinkTank'
var app = angular.module('LinkTank', ['ngRoute', 'ngResource']);

// Angular Routing Configuration
app.config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true); 
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .when('/volunteer_login', {
                templateUrl: 'views/volunteerLogin.html',
                controller: 'VolunteerLoginController'
            })
            .when('/organization_login',{
                templateUrl: 'views/organizationLogin.html',
                controller: 'OrganizationLoginController'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterController'
            })
    }])