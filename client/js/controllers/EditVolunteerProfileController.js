app.controller('EditVolunteerProfileController', 
    function($scope, volunteerFactory, $routeParams, $http) {
        $scope.newVol = volunteerFactory.get({id: $routeParams.id});

        $scope.profileClick = function() {
            $scope.editType = 'profile';
            console.log($scope.editType)
        }

        $scope.picClick = function() {
            $scope.editType = 'pic';
            console.log($scope.editType);
        }

        // Updates info not picture
        $scope.updateVol = function(newVol) {
            console.log(newVol);
            volunteerFactory.update({id: $routeParams.id}, newVol);
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

            $http.post('/api/volunteers/profile_picture/' + $routeParams.id,
                fileWithForm, 
                {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}}).then(function(){
                    console.log('File Uploaded')
                }, function(err) {
                    console.log('File did not make it to where you wanted it to: ' + err.message);
                })
        }
    });