app.controller('HomeController', 
    function($scope) {
        console.log('Home Page')

        $scope.description = 'Get Involved. Track your time. Change the world.'

        //head
        $scope.slogan = 'Teamwork makes the dream work'
        $scope.companyDescription = 'LinkTank connects volunteers with the organizations who need them, and gives volunteers a simple user-friendly way to track volunteer hours.'

        //service
        $scope.whatWeDo = "Whether you are an organization that needs volunteers, or a volunteer that needs an organization, we can link you together!"
        $scope.servicePointOne = "Signing up is easy. Click the Sign Up button up top to get started!"
        $scope.servicePointTwo = "As an organization, create a new event from your profile page. As a volunteer, navigate to 'All Events' and start signing up!"
        $scope.servicePointThree = "Go to your events and do your comunitee a service!"
        $scope.servicePointFour = "Of course you are going to want to tell the world about what you have done. All past events will be on your profile!"
   
        // team
        $scope.personOneName = "Clay"
        $scope.personOneTitle = "This is your title"
        $scope.personeOneAbout = "Something cool will go here"

        $scope.personTwoName = "Warren"
        $scope.personTwoTitle = "This is your title"
        $scope.personeTwoAbout = "Something cool will go here"

        $scope.personThreeName = "Andrew"
        $scope.personThreeTitle = "This is your title"
        $scope.personThreeAbout = "Something cool will go here"
        
    
 })

//  Whether you are an organization that needs volunteers, or a volunteer that needs an organization, we can link you together!