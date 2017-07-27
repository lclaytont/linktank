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
                    profileRedirect();
                    // empty email and password fields 
                    $scope.email = '';
                    $scope.password = '';
                }, function(err) {
                    console.log(err);
                    $scope.email = '';
                    $scope.password = '';
                    alert("You entered an incorrect email address or password. Please try again.")
                })
            }

        function profileRedirect() {
            window.location.href = '/'
        }
    })