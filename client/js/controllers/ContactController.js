
app.controller('ContactController', function ($scope, emailFactory) {
    console.log("Contact Page Loaded")


    $scope.sendMessage = function () {
        var newEmail = {
            to: 'warren.cook6@gmail.com',
            from: $scope.email,
            subject: $scope.subject,
            content: $scope.content
        }
        console.log(newEmail);

        var finalEmail = new emailFactory(newEmail);
        finalEmail.$save(function () {
            console.log("Shit sent. should be gucci")
            alert("Thank you for your feedback!")
        }, function () {
                console.log("Error sending email")
        })
        //resets fields
        $scope.email = '';
        $scope.subject = '';
        $scope.content = '';
    }
})