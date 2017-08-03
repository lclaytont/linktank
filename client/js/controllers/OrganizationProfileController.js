app.controller('OrganizationProfileController',
    function ($scope, $routeParams, organizationFactory, organizationUpcomingEventsFactory, $filter, updateEventFactory) {
        console.log('Welcome to an orgs profile!')

        $scope.organization = organizationFactory.get({ id: $routeParams.id });
        console.log($scope.organization);

        $scope.orgEvents = organizationUpcomingEventsFactory.query({ id: $routeParams.id });
        console.log($scope.orgEvents);
        $scope.createEvent = function() {
        var newEvent = $scope.event
        console.log(newEvent);
        var newDate = new Date(newEvent.date).split("T")[0];
        console.log(newDate);


            var newEvent = {
                title: $scope.title, 
                description: $scope.description,
                address: $scope.address, 
                city: $scope.city, 
                state: $scope.state, 
                date: $scope.date,
                startTime: $scope.startTime, 
                endTime: $scope.endTime,
                helpNeeded: $scope.helpNeeded
            }
        }

        $scope.grabEvent = function(o){   
            var timeDate = o.date.split("T")[0]
            var start = o.startTime.split("T")[1];
            var end = o.endTime.split("T")[1];

            $scope.singleEvent = o; 
            $scope.singleEvent.date = new Date(o.date.split("T")[0]);

            $scope.singleEvent.startTime = new Date(timeDate + "T" +  start);
            $scope.singleEvent.endTime = new Date(timeDate + "T" + end);
            
                $scope.update = function(singleEvent) {
                var udEvent = singleEvent;
                // var utcTimeDiff = new Date().getTimezoneOffset().toString();
                // console.log(utcTimeDiff);
                var dateElem = new Date(udEvent.date).toISOString().split("T")[0]; 
                var begin = new Date(udEvent.startTime).toISOString().split("T")[1];
                // console.log(begin - utcTimeDiff);
                var theEnd = new Date(udEvent.endTime).toISOString().split("T")[1];
                // start time
                var beginPieces = begin.split(":");
                var ultimateHack = beginPieces[0] - 5;
                var putItBack2gether = ultimateHack + ":" + beginPieces[1] + ":" + beginPieces[2];
                // end time 
                var endPieces = theEnd.split(":");
                var penUltimateHack = endPieces[0] > 4 ? endPieces[0] - 5 : (endPieces[0] + 24 - 5);
                var endItBack2gether = penUltimateHack + ":" + endPieces[1] + ":" + endPieces[2]; 
                // constructing new object
                newObj = {
                    address : udEvent.address,
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
                    totalHours: udEvent.totalHours
                }
                console.log(newObj);
                updateEventFactory.update({id: singleEvent.id}, newObj); 
                }

        }
    }) 

    
    

        // for making a new event
        // $scope.createEvent = function () {
        //     var newEvent = {
        //         title: $scope.title,
        //         description: $scope.description,
        //         helpNeded: $scope.helpNeeded,
        //         startTime: $scope.startTime
        //         endTime: $scope.endTime,
        //         totalHours: $scope.totalHours
        //     }
        //     console.log(newEvent);

        //     var u = new organizationUpcomingEventsFactory(newEvent);
        //     u.$save(function (data) {
        //         console.log("penis")
        //         organizationUpcomingEventsFactory(newEvent)
        //             .then(function (data) {
        //                 console.log(data);
        //             }, function (err) {
        //                 console.log('Could not make a new event.')
        //             })
        //     }, function (err) {
        //         console.log('another fucking error');
        //     });
        // };






    


