var express = require('express');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud'); //Same as below.
var Twitter = require('twitter'); //Can I get rid of this because it's over in the Twitter service?? 
var mainController = require('./mainController');

var app = module.exports = express();

app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());

app.get('/api/pi/:twitter_handle', mainController.getPersonalityInsights);

console.log(process.env.twitter_consumer_key);
console.log(process.env.watson_username);
console.log(process.env.watson_password);

var port = process.env.PORT;
app.listen(port, function() {
  console.log("Listening on", port);
})