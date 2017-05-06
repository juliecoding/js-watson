angular.module('watsonApp').controller('mainController', function($scope, mainService) {


    var allTheLonelyPeople = mainService.allTheLonelyPeople;

    $scope.getTraits = function(name) {
        if (allTheLonelyPeople[name]) {
            $scope.traitKeys = Object.keys(allTheLonelyPeople[name]);
            $scope.celebTraits = allTheLonelyPeople[name];
        }
    }

});

// .controller('MyController', ['$scope', 'reverseFilter', function($scope, reverseFilter) {
//     $scope.greeting = 'hello';
//     $scope.filteredGreeting = reverseFilter($scope.greeting);
// }]);


//$scope.humanResults = mainService.getTweets().then(function(response) {
// mainService.getPiAnalysis(response).then(function(response2) {

// })
// });