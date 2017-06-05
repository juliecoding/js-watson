angular.module('watsonApp').controller('mainController', function($scope, mainService) {

  var allTheLonelyPeople = mainService.allTheLonelyPeople;

  $scope.getTraits = function(name) {
    if (allTheLonelyPeople[name]) {
      $scope.traitKeys = Object.keys(allTheLonelyPeople[name]);
      $scope.celebTraits = allTheLonelyPeople[name];
    }
  };


  $scope.getTraits2 = function(profile1, profile2) {
    mainService.compare(profile1, profile2).then(function(response) {
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
      };
      $scope.theKingAndI = sortStart(response);

      $scope.arrayOfTraitObjects = [];
      for (let i = 0; i < workableArray.length; i++) {
        if (workableArray[i]) {
          let traitsObj = {};
          traitsObj.trait = workableArray[i][0]
          traitsObj.commonality = workableArray[i][1];
          traitsObj.me = mainService.prof1[workableArray[i][0]];
          traitsObj.celeb = mainService.prof2[workableArray[i][0]];
          $scope.arrayOfTraitObjects.push(traitsObj);
        }
      }
    });
  }

});