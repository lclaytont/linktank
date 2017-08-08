app.controller('HomeController', 
    function($scope) {
        console.log('Home Page')

        $scope.description = 'Get Involved. Track your time. Change the world.'

        //head
        $scope.slogan = 'Teamwork makes the dream work'
        $scope.companyDescription = 'LinkTank connects volunteers with the organizations who need them, and gives volunteers a simple user-friendly way to track volunteer hours.'

        //service
        $scope.whatWeDo = "Whether you are an organization that needs volunteers, or a volunteer that needs an organization, we can link you together!"
        $scope.servicePointOne = "Signing up is easy. Click the Sign Up button up top then choose the role that fits you most to get started!"
        $scope.servicePointTwo = "As an organization, create a new event from your profile page. As a volunteer, navigate to 'All Events' and start signing up!"
        $scope.servicePointThree = "Go to the events that you have signed up for and have a blast meeting new people serving your community!"
        $scope.servicePointFour = "On your profile page see all of the events that you have coming up and the ones you have completed!"
   
        // team
        $scope.personOneName = "Clay"
        $scope.personOneTitle = "Co-Founder and CEO"
        $scope.personeOneAbout = "The only difference between a winner and a loser is a winner plays until he wins"

        $scope.personTwoName = "Warren"
        $scope.personTwoTitle = "Co-Founder and CTO"
        $scope.personeTwoAbout = "My Conversations with God always seem to leave him speechless"

        $scope.personThreeName = "Andrew"
        $scope.personThreeTitle = "Co-Founder and CFO"
        $scope.personThreeAbout = "If you are afraid to fail, you will never succeed"
    
 })

//  Whether you are an organization that needs volunteers, or a volunteer that needs an organization, we can link you together!