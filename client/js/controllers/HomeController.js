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
        $scope.personOneTitle = "Co-Founder and CEO"
        $scope.personeOneAbout = "The only difference between a winner and a loser is a winner plays until he wins"

        $scope.personTwoName = "Warren"
        $scope.personTwoTitle = "Co-Founder and CTO"
        $scope.personeTwoAbout = "My Conversations with God always seem to leave him speechless"

        $scope.personThreeName = "Andrew"
        $scope.personThreeTitle = "Co-Founder and CFO"
        $scope.personThreeAbout = "Obama cool, but he ain't sending me no free checksrs"
    
    
 })

//  Whether you are an organization that needs volunteers, or a volunteer that needs an organization, we can link you together!