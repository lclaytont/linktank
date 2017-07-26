app.controller('OrganizationProfileController',
    function ($scope, userService) {
        console.log('Welcome to an orgs profile!')

        var jumboHeight = $('.jumbotron').outerHeight();
        function parallax() {
            var scrolled = $(window).scrollTop();
            $('.bg').css('height', (jumboHeight - scrolled) + 'px');
        }

        $(window).scroll(function (e) {
            parallax();
        });
    })