angular.module('watsonApp').controller('mainController', function($scope, mainService) {


  var allTheLonelyPeople = mainService.allTheLonelyPeople;

  $scope.getTraits = function(name) {
    if (allTheLonelyPeople[name]) {
      $scope.traitKeys = Object.keys(allTheLonelyPeople[name]);
      $scope.celebTraits = allTheLonelyPeople[name];
    }
  };

  mainService.compare('@juliecoding', '@kingjames').then(function(response) {
    console.log(response);
    let workableArray = [];

    const sortStart = (obj) => {
      for (var prop in obj) {
        workableArray.push([prop, obj[prop]]);
      }
      const sortFunction = (a, b) => {
        if (a[1] === b[1]) {
          return 0;
        } else {
          return (a[1] < b[1] ? -1 : 1);
        }
      }
      workableArray = workableArray.sort(sortFunction).splice(0, 5);
      console.log(workableArray)
    };
    $scope.theKingAndI = sortStart(response);


    $scope.awesomeArray = [];
    for (let i = 0; i < workableArray.length; i++) {
      console.log(mainService.prof1.Adventurousness);
      console.log(workableArray[i][0]);
      console.log(workableArray[i][1], mainService.prof1[workableArray[i][0]], mainService.prof2[workableArray[i][0]]);
      if (workableArray[i]) {
        $scope.awesomeArray.push([workableArray[i][1], mainService.prof1[workableArray[i][0]], mainService.prof2[workableArray[i][0]]]);
      }
    }
  });




});