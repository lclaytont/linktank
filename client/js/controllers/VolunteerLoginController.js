app.controller('VolunteerLoginController',
    function ($scope, userService, $location) {

        userService.me().then(function (user) {
            $scope.$applyAsync(function () {
                $scope.user = user;
            })
        })

        $scope.role = 'Volunteer'; 

        $scope.orgRole = function() {
            $scope.role = 'Organization'
            console.log($scope.role);
        }

        $scope.volRole = function() {
            $scope.role = 'Volunteer';
            console.log($scope.role);
        }

        // userService.me().then(function(user) {
        //     $scope.user = user;
        // })

        $scope.login = function () {

            console.log($scope.role)


            $scope.loginObj = {
                email: $scope.email,
                password: $scope.password
            }

            if($scope.role === 'Volunteer') {
                
                userService.VolunteerLogin($scope.loginObj)
                    .then(function (data) {
                        var volId = data.id
                        $scope.user = data;
                        // redirect to profile page
                        volRedirect(volId);
                        // profileRedirect();
                        // empty email and password fields 
                        $scope.email = '';
                        $scope.password = '';
                    }, function (err) {
                        console.log(err);
                        $scope.email = '';
                        $scope.password = '';
                        alert("You entered an invalid email address or password. Please try again.")
                    })
            } else if ($scope.role === 'Organization') {
                console.log('bitch Im a dog');

                userService.OrganizationLogin($scope.loginObj)
                    .then(function (data) {
                        var orgId = data.id
                        $scope.user = data;
                        // redirect to profile page
                        orgRedirect(orgId);
                        // profileRedirect();
                        // empty email and password fields 
                        $scope.email = '';
                        $scope.password = '';
                    }, function (err) {
                        console.log(err);
                        $scope.email = '';
                        $scope.password = '';
                        alert("You entered an invalid email address or password. Please try again.")
                    })
            } else {
                alert('Please designate whether you are an Organzation or a Volunteer')
            }


            // console.log($scope.loginObj);

            // userService.VolunteerLogin($scope.loginObj)
            //     .then(function (data) {
            //         var volId = data.id
            //         $scope.user = data;
            //         // redirect to profile page
            //         profileRedirect(volId);
            //         // profileRedirect();
            //         // empty email and password fields 
            //         $scope.email = '';
            //         $scope.password = '';
            //     }, function (err) {
            //         console.log(err);
            //         $scope.email = '';
            //         $scope.password = '';
            //         alert("You entered an invalid email address or password. Please try again.")
            //     })
        }

        function volRedirect(x) {
            $location.path('/volunteer_profile/' + x);
        }

        function orgRedirect(a) {
            $location.path('/organization_profile/' + a);
        }
            // userService.me();

           $scope.logout = function () {
               userService.VolunteerLogout()
                   .then(function () {
                       console.log('logged out!');
                       location.reload();
                       alert('You have been logged out!');
                   }, function (err) {
                       console.log(err);
                   })
           }
        }

    )