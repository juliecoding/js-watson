angular.module('watsonApp').service('mainService', function($http) {

    // this.getTweets = function() {
    //     return $http({
    //         method: 'GET,
    //         url: '/api/tweets'
    //     })
    // }

    // this.getPiAnalysis = function() {
    //     return $http({
    //         method: 'GET',
    //         url: '/api/pi'
    //     })
    // }

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