app.controller('VolunteerLoginController',  
    function($scope, userService) {
        console.log('Volunteer Login to use our page')

        $scope.login = function() {

            $scope.loginObj = {
                email: $scope.email,
                password: $scope.password
            } 
        
            console.log($scope.loginObj);

            userService.login($scope.loginObj)
                .then(function() {
                    // redirect to profile page

                    // empty email and password fields 
                    $scope.email = '';
                    $scope.password = '';
                }, function(err) {
                    console.log(err);
                    // empty email and password fields
                    // remember to remove later and trigger error response
                    $scope.email = '';
                    $scope.password = '';
                    alert("You entered an incorrect email address or password. Please try again.")
                })
            }

        // function profileRedirect() {
        //     var dest = 
        // }
    })