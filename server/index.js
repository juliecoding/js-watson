var express = require('express');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
var Twitter = require('twitter');
var config = require('./config')

var app = module.exports = express();

app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());

var personality_insights = watson.personality_insights({
    username: config.watson.username,
    password: config.watson.password,
    version: 'v2'
})


var twitter_client = new Twitter({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.access_token_key,
    access_token_secret: config.twitter.access_token_secret
})

var twitter_params = {
    screen_name: config.twitter_user_handle,
    count: 200,
    include_rts: false
}

var watson_params = {
    text: "" //TWEET TEXT GOES HERE 
}

app.get('/api/tweets', function(req, res, next) {
    twitter_client.get('statuses/user_timeline', twitter_params, function(error, tweets, response) {
        var tweetString = "";
        if (error) {
            console.log(error);
        }
        var help = JSON.parse(response.body);
        for (var i = 0; i < help.length; i++) {
            tweetString += (" " + help[i].text);
            tweetString = tweetString.replace(/[\"\r\n]/, " ");
        }
        console.log(tweetString);
        res.status(200).send(tweetString);
    });
});



app.get('/api/pi', function(req, res, next) {
    personality_insights.profile(watson_params, function(error, response) {
        if (error) {
            console.log('Error:', error)
        } else {
            //var thingToFlatten = response;
            res.status(200).send(response);
        }
    })
});

function flatten(returned_personality_object) {
    var data = {};
    var startingNode = returned_personality_object['tree']['children'];
    for (var i = 0; i < startingNode.length; i++) {
        if (startingNode[i].children) {
            for (var j = 0; j < startingNode[i].children.length; j++) {
                if (startingNode[i].children[j].children) {
                    for (var k = 0; k < startingNode[i].children[j].children.length; k++) {
                        if (startingNode[i].children[j].children[k].children) {
                            for (var l = 0; l < startingNode[i].children[j].children[k].children.length; l++) {
                                var needsOrValuesPropName = startingNode[i].children[j].children[k].children[l].id;
                                var needsOrValuesPercentage = startingNode[i].children[j].children[k].children[l].percentage;
                                data[needsOrValuesPropName] = needsOrValuesPercentage;
                            }
                        } else {
                            var personalityPropName = startingNode[i].children[j].children[k].id;
                            var personalityPercentage = startingNode[i].children[j].children[k].percentage;
                            data[personalityPropName] = personalityPercentage;
                        }
                    }
                }
            }
        }
    }
    console.log("LUKE, I AM YOUR DATA", data);
    return data;
}


var dataToFlatten = { //Outermost layer: this is an object
    "id": "*UNKNOWN*",
    "source": "*UNKNOWN*",
    "word_count": 259,
    "word_count_message": "There were 259 words in the input. We need a minimum of 600, preferably 1,200 or more, to compute statistically significant estimates",
    "processed_lang": "en",
    "tree": { //Second layer: this is an object
        "id": "r",
        "name": "root",
        "children": [ //Third layer: this is an ARRAY
            {
                "id": "personality",
                "name": "Big 5",
                "children": [{ //Fourth layer: this is ALSO AN ARRAY
                    "id": "Openness_parent",
                    "name": "Openness",
                    "category": "personality",
                    "percentage": 0.9481654509544678,
                    "children": [ //Fifth layer: also an ARRAY (of objects)
                        { //Sixth layer
                            "id": "Openness",
                            "name": "Openness",
                            "category": "personality",
                            "percentage": 0.9481654509544678,
                            "sampling_error": 0.0636292423,
                            "children": [{
                                    "id": "Adventurousness",
                                    "name": "Adventurousness",
                                    "category": "personality",
                                    "percentage": 0.47220823673788376,
                                    "sampling_error": 0.0533429559
                                },
                                {
                                    "id": "Liberalism",
                                    "name": "Authority-challenging",
                                    "category": "personality",
                                    "percentage": 0.9962119858717458,
                                    "sampling_error": 0.08715480589999999
                                }
                            ]
                        },
                        {
                            "id": "Conscientiousness",
                            "name": "Conscientiousness",
                            "category": "personality",
                            "percentage": 0.15068251516960196,
                            "sampling_error": 0.0797645262,
                            "children": [{
                                    "id": "Achievement striving",
                                    "name": "Achievement striving",
                                    "category": "personality",
                                    "percentage": 0.40632666303279535,
                                    "sampling_error": 0.1029995538
                                },
                                {
                                    "id": "Self-efficacy",
                                    "name": "Self-efficacy",
                                    "category": "personality",
                                    "percentage": 0.3449156159910621,
                                    "sampling_error": 0.0963107804
                                }
                            ]
                        }
                    ]
                }]
            },
            {
                "id": "needs",
                "name": "Needs",
                "children": [{
                    "id": "Stability_parent",
                    "name": "Stability",
                    "category": "needs",
                    "percentage": 0.020086985921163425,
                    "children": [{
                            "id": "Challenge",
                            "name": "Challenge",
                            "category": "needs",
                            "percentage": 0.13437194022757287,
                            "sampling_error": 0.0864508982
                        },
                        {
                            "id": "Structure",
                            "name": "Structure",
                            "category": "needs",
                            "percentage": 0.022351908451296587,
                            "sampling_error": 0.0823939337
                        }
                    ]
                }]
            },
            {
                "id": "values",
                "name": "Values",
                "children": [{
                    "id": "Conservation_parent",
                    "name": "Conservation",
                    "category": "values",
                    "percentage": 0.0015774733805226648,
                    "children": [{
                            "id": "Conservation",
                            "name": "Conservation",
                            "category": "values",
                            "percentage": 0.0015774733805226648,
                            "sampling_error": 0.0701132456
                        },
                        {
                            "id": "Self-transcendence",
                            "name": "Self-transcendence",
                            "category": "values",
                            "percentage": 0.4622241271139642,
                            "sampling_error": 0.0848802275
                        }
                    ]
                }]
            }
        ]
    },
    "warnings": [{
        "warning_id": "WORD_COUNT_MESSAGE",
        "message": "There were 259 words in the input. We need a minimum of 600, preferably 1,200 or more, to compute statistically significant estimates"
    }]
}

// PERSONALITY LOOKS LIKE SO: 
// data_set = obj
// tree = obj
// children = array of objects (personality, needs, values) 
// (prop) children = array of objects (e.g., Openness_parent)
// (prop) children = array of objects (e.g., Openness)
// (prop) children = array of objects (e.g., Adventurousness)


// NEEDS LOOKS LIKE SO: 
// data_set = obj
// tree = obj
// children = array of objects (personality, needs, values) 
// (prop) children = array of objects (e.g., Stability)
// (prop) children = array of objects (e.g., Challenge and Structure)


// VALUES LOOKS LIKE SO: 
// data_set = obj
// tree = obj
// children = array of objects (personality, needs, values)
// (prop) children = array of objects (e.g., Conservation_parent)
// (prop) children = array of objects (e.g., Conservation, Self-transcendence)



flatten(dataToFlatten);

var port = config.PORT;

app.listen(port, function() {
    console.log("Listening on", port);
})