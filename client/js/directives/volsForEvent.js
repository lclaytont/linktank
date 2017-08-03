// should be able to use this to get the volunteers for the event

app.directive('vForEvent',
    function() {
        return {
            restric: 'E',
            templateUrl: 'views/volunteersForEvent.html'
        }
    }
)