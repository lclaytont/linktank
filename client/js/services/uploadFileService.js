app.service('UploadFileService', 
    function($http) {

        this.upload = function(file) {
            var fd = new FormData();
            fd.append('profilePic', file.upload);
            return fd
        }
    });