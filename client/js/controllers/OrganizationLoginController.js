app.controller('OrganizationLoginController',
    function($scope, userService) {

        $scope.login = function() {
            
            $scope.loginObj = {
                email: $scope.email,
                password: $scope.password
            }

            console.log($scope.loginObj)

            userService.OrganizationLogin($scope.loginObj)
                .then(function(data) {
                    console.log('Signed Org in')
                    profileRedirect(data.id)
                    $scope.email = ''
                    $scope.password = ''
                }, function(err) {
                    console.log('Error logging in user: ' + err);
                    $scope.email = '',
                    $scope.password = '', 
                    alert('You entered an incorrect Email or Password. Please try again.')
                })

            function profileRedirect(x) {
                //Temporarily navigate to home page
                window.location.href = '/organization_profile/' + x;
            } 
        }
    })