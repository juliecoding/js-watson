angular.module('watsonApp').controller('mainController', function($scope, mainService) {

  $scope.arrayOfTraitObjects = [];

  let allTheLonelyPeople = mainService.allTheLonelyPeople;

  const sortFunction = (a, b) => {
    if (a[1] === b[1]) {
      return 0;
    } else {
      return (a[1] < b[1] ? -1 : 1);
    }
  }

  $scope.getTraitsStatic = function(name) {
    if (allTheLonelyPeople[name]) {
      $scope.arrayOfTraitObjects = allTheLonelyPeople[name];
    }
  };


  $scope.getTraits2 = function(profile1, profile2) {
    mainService.compare(profile1, profile2)
      .then(function(response) {
        let workableArray = [];
        const sortStart = (obj) => {
          for (var prop in obj) {
            workableArray.push([prop, obj[prop]]);
          }
          workableArray = workableArray.sort(sortFunction).splice(0, 5);
        };

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
      })
      .catch(function(error) {
        console.log(error);
        $scope.getTraitsStatic(profile2);
      });
  }
});
