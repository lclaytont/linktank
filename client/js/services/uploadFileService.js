app.service('UploadFileService', 
    function($http) {

        this.createFormData = function(file) {
            var fd = new FormData();
            fd.append('profilePic', file.upload);

        }
    });