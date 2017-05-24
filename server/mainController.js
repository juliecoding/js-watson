var Twitter = require('twitter');
var watson = require('watson-developer-cloud');

var twitter_client = new Twitter({
  consumer_key: process.env['twitter.consumer_key'],
  consumer_secret: process.env['twitter.consumer_secret'],
  access_token_key: process.env['twitter.access_token_key'],
  access_token_secret: process.env['twitter.access_token_secret']
});

var personality_insights = watson.personality_insights({
  username: process.env['watson.username'],
  password: process.env['watson.password'],
  version: 'v2'
});

const flatten = function(returned_personality_object) {
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
  return data;
}

const getPersonalityInsights = function(req, res, next) {
  let tweetString = '';

  const twitter_params = {
    screen_name: req.params.twitter_handle,
    count: 200,
    include_rts: false
  }

  twitter_client.get('statuses/user_timeline', twitter_params, function(error, tweets, response) { //this function is like the .then of this method; that's why the next function (the Watson call) has to be contained within it.
    if (error) {
      console.log(error);
    }
    var help = JSON.parse(response.body);
    for (var i = 0; i < help.length; i++) {
      tweetString += (" " + help[i].text);
      tweetString = tweetString.replace(/[\"\r\n]/, " ");
    }

    let watson_params = {
      text: tweetString
    }

    personality_insights.profile(watson_params, function(error, response) {
      if (error) {
        console.log('Error:', error)
      } else {
        let flat = flatten(response)
        res.status(200).send(flat);
      }
    })
  });
};

module.exports = {
  getPersonalityInsights
}