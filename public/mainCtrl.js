angular.module('watsonApp').controller('mainController', function($scope, mainService) {

  var allTheLonelyPeople = mainService.allTheLonelyPeople;

  $scope.getTraits = function(name) {
    if (allTheLonelyPeople[name]) {
      $scope.traitKeys = Object.keys(allTheLonelyPeople[name]);
      $scope.celebTraits = allTheLonelyPeople[name];
    }
  };


  $scope.getTraits2 = function(user1, user2) {
    mainService.compare(user1, user2).then(function(response) {
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


//Ultimate desired appearance of these objects 
// var kim = [
//   {
//     'Altruism': 0.332847185565,   //degree of separation
//     me: 0.347230623563,          //my score
//     celeb: 0.0143834379983       //their score 
//   },
//   {
//     'Vulnerability': 0.92062189458, 
//     me: 0.847154386945, 
//     celeb: 0.0734675076353
//   },
//   {
//     'Trust': 0.426188167294, 
//     me: 0.5011449497, 
//     celeb: 0.0749567824052,
//   },
//   {
//     'Activity level': 0.455105766665, 
//     me: 0.541341110874, 
//     celeb: 0.0862353442095,
//   }
// ]