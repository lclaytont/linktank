app.controller('EditVolunteerProfileController', 
    function($scope, volunteerFactory, $routeParams, UploadFileService) {
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

        $scope.updatePic = function() {
            var fileWithForm = uploadFileService.upload

            $http.post('http//localhost:3000/api/volunteers/profile_pic/' + $routeParams.id,
                fileWithForm, {transformRequest: angular.identity,
                headers: {'Content-Type': undefined}})
        }
    });