app.controller('OrganizationProfileController',
    function ($scope, $routeParams, organizationFactory, organizationUpcomingEventsFactory, $filter, updateEventFactory, $http, pastEventFactory, volsForEventFactory, $location) {
        console.log('Welcome to an orgs profile!')

        $scope.organization = organizationFactory.get({ id: $routeParams.id });
        console.log($scope.organization);

        $scope.orgEvents = organizationUpcomingEventsFactory.query({ id: $routeParams.id });
        console.log($scope.orgEvents);

        $scope.pastOrgEvents = pastEventFactory.query({ id: $routeParams.id });
        console.log($scope.pastOrgEvents)

        // DELETE AN EVENT
        $scope.delete = function (singleEvent) {
            console.log(singleEvent.id)
            var thing = updateEventFactory.get({ id: singleEvent.id })
            console.log(thing)
            thing.$delete({ id: singleEvent.id });
        }

        $scope.goToVol = function (v) {
            // console.log(v);
            $('#manageEventModal').modal('toggle');
            $location.url('/volunteer_profile/' + v.Volunteers_id)
        }
        // CREATE A NEW EVENT
        $scope.createEvent = function (event) {
            console.log(event.help);
            console.log(event)
            //Splits date objs into manipulatable pieces
            var newDate = new Date(event.date).toISOString().split("T")[0];
            var newStart = new Date(event.startTime).toISOString().split("T")[1];
            var newEnd = new Date(event.endTime).toISOString().split("T")[1];

            //Manipulates date objs
            var newStartPieces = newStart.split(":");
            var newEndPieces = newEnd.split(":");
            var newStartHour = newStartPieces[0] > 4 ? (parseInt(newStartPieces[0]) - 5) : (parseInt(newStartPieces[0]) + 24 - 5);
            var newEndHour = newEndPieces[0] > 4 ? (parseInt(newEndPieces[0]) - 5) : (parseInt(newEndPieces[0]) + 24 - 5);
            var newStartTime = newStartHour + ":" + newStartPieces[1] + ":" + newStart[2];
            var newEndTime = newEndHour = ":" + newEndPieces[1] + ":" + newEndPieces[2];

            console.log(newDate);

            var newEvent = {
                title: event.title,
                description: event.description,
                address: event.address,
                city: event.city,
                state: event.state,
                date: newDate,
                startTime: newDate + " " + newStartTime,
                endTime: newDate + " " + newEndTime,
                helpNeeded: event.help,
                totalHours: event.totalHours
            }

            console.log(newEvent.helpNeeded);

            $http({
                method: 'POST',
                url: '/api/events/' + $routeParams.id,
                data: newEvent
            }).then(function () {
                console.log('EVENT ADDED')
                window.location.reload();
            }, function (err) {
                console.log('Nah. Event Not Added.')
            })
        }


        // GRAB AN EVENT TO UPDATE
        $scope.grabEvent = function (o) {
            var timeDate = o.date.split("T")[0]
            var start = o.startTime.split("T")[1];
            var end = o.endTime.split("T")[1];

            $scope.singleEvent = o;
            $scope.singleEvent.date = new Date(o.date.split("T")[0]);

            $scope.singleEvent.startTime = new Date(timeDate + "T" + start);
            $scope.singleEvent.endTime = new Date(timeDate + "T" + end);

            // GRAB VOLS FOR EVENT AND PUT THEM ON THE MODAL
            $scope.vols = volsForEventFactory.query({ id: o.id });
            console.log($scope.vols);




            $scope.update = function (singleEvent) {
                var udEvent = singleEvent;
                // var utcTimeDiff = new Date().getTimezoneOffset().toString();
                // console.log(utcTimeDiff);
                var dateElem = new Date(udEvent.date).toISOString().split("T")[0];
                var begin = new Date(udEvent.startTime).toISOString().split("T")[1];
                // console.log(begin - utcTimeDiff);
                var theEnd = new Date(udEvent.endTime).toISOString().split("T")[1];
                // start time
                var beginPieces = begin.split(":");
                var ultimateHack = beginPieces[0] > 4 ? (parseInt(beginPieces[0]) - 5) : (parseInt(beginPieces[0]) + 24 - 5);
                var putItBack2gether = ultimateHack + ":" + beginPieces[1] + ":" + beginPieces[2];
                // end time 
                var endPieces = theEnd.split(":");
                console.log(theEnd);
                console.log(parseInt(endPieces[0]) + 24)
                var penUltimateHack = endPieces[0] > 4 ? (parseInt(endPieces[0]) - 5) : (parseInt(endPieces[0]) + 24 - 5);
                var endItBack2gether = penUltimateHack + ":" + endPieces[1] + ":" + endPieces[2];
                // constructing new object
                newObj = {
                    address: udEvent.address,
                    city: udEvent.city,
                    date: dateElem,
                    description: udEvent.description,
                    endTime: dateElem + " " + endItBack2gether,
                    helpNeeded: udEvent.helpNeeded,
                    id: udEvent.id,
                    orgId: udEvent.orgId,
                    orgName: udEvent.orgName,
                    organizationId: udEvent.organizationId,
                    startTime: dateElem + " " + putItBack2gether,
                    state: udEvent.state,
                    title: udEvent.title,
                    address: udEvent.address,
                    city: udEvent.city,
                    state: udEvent.state,
                    totalHours: udEvent.totalHours
                }
                console.log(newObj);
                updateEventFactory.update({ id: singleEvent.id }, newObj);
            }

        }
    })












