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


    $scope.awesomeObject = {};
    for (let i = 0; i < workableArray.length; i++) {
      if (workableArray[i]) {
        $scope.awesomeObject[workableArray[i][0]] = workableArray[i][1];
        $scope.awesomeObject.me = mainService.prof1[workableArray[i][0]];
        $scope.awesomeObject.celeb = mainService.prof2[workableArray[i][0]];
        console.log("HEYO", $scope.awesomeObject);
      }
    }
  });




});


//Ultimate desired appearance of these objects 
// kim: {
//   'Achievement striving': [0.332847185565, 0.347230623563, 0.0143834379983],
//   'Vulnerability': [0.92062189458, 0.847154386945, 0.0734675076353],
//   'Trust': [0.426188167294, 0.5011449497, 0.0749567824052],
//   'Activity level': [0.455105766665, 0.541341110874, 0.0862353442095],
//   'Altruism': [0.384503757388, 0.285584235948, 0.0989195214401]
// }

//Alternative model: 
// var kim = [
//   {
//     'Altruism': 0.332847185565,
//     me: 0.347230623563,
//     them: 0.0143834379983
//   },
//   {
//     'Vulnerability': 0.92062189458, 
//     me: 0.847154386945, 
//     them: 0.0734675076353
//   },
//   {
//     'Trust': 0.426188167294, 
//     me: 0.5011449497, 
//     them: 0.0749567824052,
//   },
//   {
//     'Activity level': 0.455105766665, 
//     me: 0.541341110874, 
//     them: 0.0862353442095,
//   }
// ]