app.controller('VolunteerProfileController', ['$scope', 'volunteerFactory', '$routeParams', 'volEventListFactory',
    function ($scope, volunteerFactory, $routeParams, volEventListFactory) {
        console.log('Vol Profile Loaded');

        //this returns the users info
        $scope.volunteer = volunteerFactory.get({ id: $routeParams.id })
        console.log($scope.volunteer);

        // this returns the events that the user is signed up for
        $scope.volEvents = volEventListFactory.query({ id: $routeParams.id });
        console.log($scope.volEvents);

        var acc = document.getElementsByClassName("accordion");
        var i;

        // for the accordian
        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            }
        }
    }]);