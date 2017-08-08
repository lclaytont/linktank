app.controller('VolunteerProfileController',
    function ($scope, volunteerFactory, $routeParams, volUpcomingEventsFactory, volPastEventsFactory, $location, $http) {
        console.log('Vol Profile Loaded');

        //this returns the users info
        $scope.volunteer = volunteerFactory.get({ id: $routeParams.id })
        console.log($scope.volunteer);

        // this returns the events that the user is signed up for
        $scope.upcomingEvents = volUpcomingEventsFactory.query({id: $routeParams.id})
        console.log($scope.upcomingEvents);

        $scope.pastEvents = volPastEventsFactory.query({id: $routeParams.id});
        console.log($scope.pastEvents);

        $scope.findEvents = function() {
            $location.path('/events')
        }

        $scope.unVolunteer = function(u) {
            console.log(u);
            var delObj = {
                volId: u.volId,
                eventId: u.id
            };

            $http({
                method: 'DELETE',
                url: '/api/events/volunteer_for_event/' + delObj.eventId
            }).then(function() {
                console.log("Successfully unvolunteered");
                alert('Successfully Un-Volunteered from event.')
                location.reload();
            }, function(err) {
                console.log("Could not unvolunteer: " + err.message);
            })
        }
        // var acc = document.getElementsByClassName("accordion");
        // var i;

        // for the accordian
        // for (i = 0; i < acc.length; i++) {
        //     acc[i].onclick = function () {
        //         this.classList.toggle("active");
        //         var panel = this.nextElementSibling;
        //         if (panel.style.maxHeight) {
        //             panel.style.maxHeight = null;
        //         } else {
        //             panel.style.maxHeight = panel.scrollHeight + "px";
        //         }
        //     }
        // }
    });