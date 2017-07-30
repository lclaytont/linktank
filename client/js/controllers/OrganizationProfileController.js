app.controller('OrganizationProfileController',
    function ($scope, $routeParams, organizationFactory) {
        console.log('Welcome to an orgs profile!')

        $scope.organization = organizationFactory.get({ id: $routeParams.id })

        console.log($scope.organization);


        

        var jumboHeight = $('.jumbotron').outerHeight();

        function parallax() {
            var scrolled = $(window).scrollTop();
            $('.orgBG').css('height', (jumboHeight - scrolled) + 'px');
        }
        $(window).scroll(function (e) {
            parallax();
        });
    })