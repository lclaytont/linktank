app.controller('HomeController', 
    function($scope) {
        console.log('Home Page')

        $scope.description = 'Get Involved. Track your time. Change the world.'

        //head
        $scope.slogan = 'Teamwork makes the dream work'
        $scope.companyDescription = 'LinkTank connects volunteers with the organizations who need them, and gives volunteers a simple user-friendly way to track volunteer hours.'

        //service
        $scope.whatWeDo = "We make people do what they are told **FIX**"
        $scope.servicePointOne = "Signing up is easy. Make a profile with all of your information and your volunteer history will show up on your profile for the world to see!"
        $scope.servicePointTwo = "Whether you are an organization that needs volunteers, or a volunteer that needs an organization, we can link you together!"
        $scope.servicePointThree = "Go the the event and do shit"
        $scope.servicePointFour = "Of course you are going to want to tell the world about what you have done. Why not do it where Universities will look at it?"
   
        // team
        $scope.personOneName = "Clay"
        $scope.personOneTitle = "This is your title"
        $scope.personeOneAbout = "Something cool will go here"

        $scope.personTwiTitle = "Warren"
        $scope.personTwoTitle = "This is your title"
        $scope.personeTwoAbout = "Something cool will go here"

        $scope.personThreeTitle = "Andrew"
        $scope.personThreeTitle = "This is your title"
        $scope.personThreeAbout = "Something cool will go here"
        
    
 })