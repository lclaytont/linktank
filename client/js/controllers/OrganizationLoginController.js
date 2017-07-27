app.controller('OrganizationLoginController',
    function($scope, userService) {

        $scope.login = function() {
            
            $scope.loginObj = {
                email: $scope.email,
                password: $scope.password
            }

            console.log($scope.loginObj)

            userService.OrganizationLogin($scope.loginObj)
                .then(function() {
                    console.log('Signed Org in')
                    profileRedirect(0)
                    $scope.email = ''
                    $scope.password = ''
                }, function(err) {
                    console.log('Error logging in user: ' + err.message);
                    $scope.email = '',
                    $scope.password = '', 
                    alert('You entered an incorrect Email or Password. Please try again.')
                })

            function profileRedirect() {
                //Temporarily navigate to home page
                window.location.href = '/'
            } 
        }
    })