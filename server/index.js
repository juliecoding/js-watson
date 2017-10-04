const express = require('express'),
  bodyParser = require('body-parser'),
  dotenv = require('dotenv');

dotenv.load();

const mainController = require('./mainController');

var app = module.exports = express();

app.use(express.static(__dirname + './../public'));
app.use(bodyParser.json());

app.get('/api/pi/:twitter_handle', mainController.getPersonalityInsights);

var port = process.env.PORT;
app.listen(port, function() {
  console.log("Listening on", port);
})
