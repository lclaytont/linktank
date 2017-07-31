
app.controller('EditOrganizationProfileController',
    function ($scope, organizationFactory, $routeParams, $http, $location) {
        console.log('Welcome to an orgs edit profile page!')

        $scope.newOrg = organizationFactory.get({id: $routeParams.id})

        console.log($scope.newOrg)

        $scope.profileClick = function() {
            $scope.editType = 'profile'
        }

        $scope.picClick = function() {
            $scope.editType = 'pic'
        } 

        $scope.updateOrg = function(newOrg) {
            console.log(newOrg);
            organizationFactory.update({id: $routeParams.id}, newOrg);
            $location.path('/organization_profile/' + $routeParams.id);
        }


        $scope.file = {};
        $scope.updatePic = function() {
            var file = $scope.file;
            var fileWithForm = new FormData();
            fileWithForm.append('profilePic', file.upload)
            console.log($scope.file);
            for (var pair of fileWithForm.entries()) {
                console.log(pair[0]);
            }

            $http.post('/api/organizations/organization_picture/' + $routeParams.id,
                fileWithForm, 
                {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}}).then(function(){
                    console.log('File Uploaded')
                    var newImg = {
                        image: '/images/userImg/org' + $routeParams.id + '.png'
                    }
                    $http.put('/api/organizations/picture_path/' + $routeParams.id,
                    newImg).then(function() {
                        console.log('Updated image path in DB');
                        $location.path('/organization_profile' + $routeParams.id)
                    }, function(err) {
                        console.log('Could not update image path in DB: ' + err.message)
                    })
                }, function(err) {
                    console.log('File did not make it to where you wanted it to: ' + err.message);
                })
        }
    })