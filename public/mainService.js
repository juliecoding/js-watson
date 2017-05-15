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

  var me = { 'Dutifulness': 0.2558701882490245, 'Cooperation': 0.3103190314051645, 'Self-consciousness': 0.960586659484669, 'Orderliness': 0.16407789280299556, 'Achievement striving': 0.28601868736803854, 'Self-efficacy': 0.37806925711649175, 'Activity level': 0.3816256748821718, 'Self-discipline': 0.04613762689806328, 'Excitement-seeking': 0.4963490257895355, 'Cautiousness': 0.18680100097108937, 'Morality': 0.10113088049145702, 'Anxiety': 0.9115707956764698, 'Emotionality': 0.38816139270139366, 'Vulnerability': 0.871774277737559, 'Immoderation': 0.38882594347967975, 'Sympathy': 0.6379408733520363, 'Friendliness': 0.01787048649959816, 'Modesty': 0.08251906685085936, 'Altruism': 0.39133098829132934, 'Assertiveness': 0.39660944001455345, 'Adventurousness': 0.43472011471678884, 'Gregariousness': 0.006256697486831164, 'Intellect': 0.9901504913317647, 'Imagination': 0.9702833445515231, 'Artistic interests': 0.870281090343064, 'Depression': 0.919301777155128, 'Anger': 0.8692720796767475, 'Trust': 0.4407233020697492, 'Cheerfulness': 0.0022670413418436897, 'Liberalism': 0.9963723187158324 }
  var trump = { 'Dutifulness': 0.9358233895666335, 'Cooperation': 0.6926212694542545, 'Self-consciousness': 0.01630979689711426, 'Orderliness': 0.7611731665947656, 'Achievement striving': 0.9638049873976717, 'Self-efficacy': 0.9504315894485676, 'Activity level': 0.85386658453458, 'Self-discipline': 0.9770500969183025, 'Excitement-seeking': 0.1060917407356759, 'Cautiousness': 0.9801320428098798, 'Morality': 0.8363157587399119, 'Anxiety': 0.029205597298171904, 'Emotionality': 0.09628246206918334, 'Vulnerability': 0.008343168069734785, 'Immoderation': 0.01842507951117278, 'Sympathy': 0.988875618160646, 'Friendliness': 0.8431320390480064, 'Modesty': 0.37418929027569203, 'Altruism': 0.8562859819595516, 'Assertiveness': 0.9897572557469497, 'Adventurousness': 0.8970820288215067, 'Gregariousness': 0.5565911752828466, 'Intellect': 0.9694427249411923, 'Imagination': 0.06824951778114013, 'Artistic interests': 0.6173328561579624, 'Depression': 0.04088388268006554, 'Anger': 0.026042210790693132, 'Trust': 0.7791456192036147, 'Cheerfulness': 0.3766246669781198, 'Liberalism': 0.7528008003089872 }

  //Matched Personality Trait -> Probability of your profile exhibiting given trait -> Probability of Celebrity's profile exhibiting given trait.
  this.allTheLonelyPeople = {
    kim: {
      'Achievement striving': [0.332847185565, 0.347230623563, 0.0143834379983],
      'Vulnerability': [0.92062189458, 0.847154386945, 0.0734675076353],
      'Trust': [0.426188167294, 0.5011449497, 0.0749567824052],
      'Activity level': [0.455105766665, 0.541341110874, 0.0862353442095],
      'Altruism': [0.384503757388, 0.285584235948, 0.0989195214401]
    },
    kanye: {
      'Artistic interests': [0.855514396943, 0.89090915008, 0.0353947531368],
      'Dutifulness': [0.297568038059, 0.233987447492, 0.0635805905671],
      'Sympathy': [0.686682548004, 0.755777421461, 0.0690948734566],
      'Adventurousness': [0.477271717841, 0.392230481025, 0.0850412368163],
      'Imagination': [0.954898082858, 0.831248403438, 0.12364967942]
    },
    lebron: {
      'Cooperation': [0.307454961435, 0.299933523532, 0.00752143790319],
      'Emotionality': [0.422932638109, 0.460178369357, 0.0372457312479],
      'Sympathy': [0.686682548004, 0.625937977503, 0.0607445705011],
      'Immoderation': [0.355459669631, 0.209639471436, 0.145820198194],
      'Adventurousness': [0.477271717841, 0.641580907765, 0.164309189924]
    },
    snowden: {
      'Cheerfulness': [0.00212302203007, 0.000440663870174, 0.0016823581599],
      'Gregariousness': [0.004474788821, 0.00694178845374, 0.00246699963274],
      'Intellect': [0.98051395313, 0.997802288268, 0.0172883351373],
      'Altruism': [0.384503757388, 0.408920507714, 0.0244167503264],
      'Friendliness': [0.0216882806265, 0.0485652688621, 0.0268769882356]

    },
    trump: {
      'Intellect': [0.98051395313, 0.96759102067, 0.0129229324597],
      'Liberalism': [0.99730801874, 0.738571018716, 0.258737000024],
      'Artistic interests': [0.855514396943, 0.595456205669, 0.260058191274],
      'Emotionality': [0.422932638109, 0.125347005834, 0.297585632275],
      'Sympathy': [0.686682548004, 0.989201467409, 0.302518919405]
    }
  }

});