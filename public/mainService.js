angular.module('watsonApp').service('mainService', function($http) {

  var serv = this;

  this.getProfile = (twitter_handle) => {
    return $http({
      method: 'GET',
      url: '/api/pi/' + twitter_handle
    }).then(function(response) {
      return response;
    })
  }

  this.compare = function(profile1, profile2) {
    return serv.getProfile(profile1).then(function(response) {
      serv.prof1 = response.data;
      return serv.getProfile(profile2).then(function(response) {
        serv.prof2 = response.data;
        compared_data = {};
        console.log(serv.prof1);
        console.log(serv.prof2);
        for (var prop in serv.prof1) {
          compared_data[prop] = Math.abs(serv.prof1[prop] - serv.prof2[prop]);
        }
        return compared_data;
      });
    });
  }


  //Matched Personality Trait -> Probability of your profile exhibiting given trait -> Probability of Celebrity's profile exhibiting given trait.
  this.allTheLonelyPeople = {
    '@KimKardashian': [
      {
        trait: 'Achievement striving',
        me: 0.332847185565,
        celeb: 0.347230623563,
        commonality: 0.0143834379983
      },
      {
        trait: 'Vulnerability',
        me: 0.92062189458,
        celeb: 0.847154386945,
        commonality: 0.0734675076353
      },
      {
        trait: 'Trust',
        me: 0.426188167294,
        celeb: 0.5011449497,
        commonality: 0.0749567824052
      },
      {
        trait: 'Activity level',
        me: 0.455105766665,
        celeb: 0.541341110874,
        commonality: 0.0862353442095
      },
      {
        trait: 'Altruism',
        me: 0.384503757388,
        celeb: 0.285584235948,
        commonality: 0.0989195214401
      }
    ],
    '@kanye': [
      {
        trait: 'Artistic interests',
        me: 0.855514396943,
        celeb: 0.89090915008,
        commonality: 0.0353947531368
      },
      {
        trait: 'Dutifulness',
        me: 0.297568038059,
        celeb: 0.233987447492,
        commonality: 0.0635805905671
      },
      {
        trait: 'Sympathy',
        me: 0.686682548004,
        celeb: 0.755777421461,
        commonality: 0.0690948734566
      },
      {
        trait: 'Adventurousness',
        me: 0.477271717841,
        celeb: 0.392230481025,
        commonality: 0.0850412368163
      },
      {
        trait: 'Imagination',
        me: 0.954898082858,
        celeb: 0.831248403438,
        commonality: 0.12364967942
      }
    ],
    '@KingJames': [
      {
        trait: 'Cooperation',
        me: 0.307454961435,
        celeb: 0.299933523532,
        commonality: 0.00752143790319
      },
      {
        trait: 'Emotionality',
        me: 0.422932638109,
        celeb: 0.460178369357,
        commonality: 0.0372457312479
      },
      {
        trait: 'Sympathy',
        me: 0.686682548004,
        celeb: 0.625937977503,
        commonality: 0.0607445705011
      },
      {
        trait: 'Immoderation',
        me: 0.355459669631,
        celeb: 0.209639471436,
        commonality: 0.145820198194
      },
      {
        trait: 'Adventurousness',
        me: 0.477271717841,
        celeb: 0.641580907765,
        commonality: 0.164309189924
      }
    ],
    '@Snowden': [
      {
        trait: 'Cheerfulness',
        me: 0.00212302203007,
        celeb: 0.000440663870174,
        commonality: 0.0016823581599
      },
      {
        trait: 'Gregariousness',
        me: 0.004474788821,
        celeb: 0.00694178845374,
        commonality: 0.00246699963274
      },
      {
        trait: 'Intellect',
        me: 0.98051395313,
        celeb: 0.997802288268,
        commonality: 0.0172883351373
      },
      {
        trait: 'Altruism',
        me: 0.384503757388,
        celeb: 0.408920507714,
        commonality: 0.0244167503264
      },
      {
        trait: 'Friendliness',
        me: 0.0216882806265,
        celeb: 0.0485652688621,
        commonality: 0.0268769882356
      }
    ],
    '@realDonaldTrump': [
      {
        trait: 'Intellect',
        me: 0.98051395313,
        celeb: 0.96759102067,
        commonality: 0.0129229324597
      },
      {
        trait: 'Liberalism',
        me: 0.99730801874,
        celeb: 0.738571018716,
        commonality: 0.258737000024
      },
      {
        trait: 'Artistic interests',
        me: 0.855514396943,
        celeb: 0.595456205669,
        commonality: 0.260058191274
      },
      {
        trait: 'Emotionality',
        me: 0.422932638109,
        celeb: 0.125347005834,
        commonality: 0.297585632275
      },
      {
        trait: 'Sympathy',
        me: 0.686682548004,
        celeb: 0.989201467409,
        commonality: 0.302518919405
      }
    ]
  }
});
