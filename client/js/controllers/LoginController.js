app.controller('LoginController',  
    function($scope, userService) {
        console.log('Login to use our page')

        
        console.log($scope.loginObj)

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
                })
            }

        // function profileRedirect() {
        //     var dest = 
        // }
    })