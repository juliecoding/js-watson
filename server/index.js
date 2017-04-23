var express = require('express');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
var Twitter = require('twitter');
var config = require('./config')

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

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
    for (var prop in returned_personality_object['tree']['children']) {
        if (prop.children) {
            for (var c2 in prop) {
                if (c2.children) {
                    for (var c3 in c2['children']) {
                        if (c3.children) {
                            for (var c4 in c3['children']) {
                                if (c4['category'] == 'personality') {
                                    data[c4['id']] = c4[percentage]
                                }
                                if (!'children' in c3) {
                                    if (c3['category'] == 'personality') {
                                        data[c3['id']] = c3[percentage];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return data;
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