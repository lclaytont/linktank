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
            .when('/volunteer_logout', {
                templateUrl: 'views/volunteerLogout.html',
                controller: 'VolunteerLogoutController'
            })
            // .when('/organization_logout',{
            //     templateUrl: 'views/organizationLogout.html',
            //     controller: 'OrganizationLogoutController'
            // })
            // .when ('/OrganizationProfile/:id'), {
            //     templateUrl:
            //     controller:
            // }
            // .when ('/VolunteersProfile/:id'), {
            //     templateUrl:
            //     controller:
            // }
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterController'
            })
            .when('/organization_profile', {
                templateUrl: 'views/organizationProfile.html',
                controller: 'OrganizationProfileController'
            })
            .when('/volunteer_profile', {
                templateUrl: 'views/volunteerProfile.html',
                controller: 'VolunteerProfileController'
            })
    }])