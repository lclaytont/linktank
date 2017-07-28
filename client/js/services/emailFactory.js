app.factory('LinkTank.factory', ['ngResource'])

    .factory('emailFactory', ['$resource', function ($resource) {
        return $resource('http://localhost:3000/api/email')
    }])