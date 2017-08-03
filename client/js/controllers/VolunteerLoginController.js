app.controller('VolunteerLoginController',  
    function($scope, userService, $location) {
        console.log('Volunteer Login to use our page')

        // used for the different navs
        userService.me().then(function(user) {
            $scope.user = user;
        })

        $scope.login = function() {

            $scope.loginObj = {
                email: $scope.email,
                password: $scope.password
            } 
         
            console.log($scope.loginObj);

            userService.VolunteerLogin($scope.loginObj)
                .then(function(data) {
                    var volId = data.id
                    $scope.user = data;
                    // redirect to profile page
                    profileRedirect(volId);
                    // profileRedirect();
                    // empty email and password fields 
                    $scope.email = '';
                    $scope.password = '';
                }, function(err) {
                    console.log(err);
                    $scope.email = '';
                    $scope.password = '';
                    alert("You entered an invalid email address or password. Please try again.")
                })
            }

        function profileRedirect(x) {
            $location.path('/volunteer_profile/' + x);
        }
    })