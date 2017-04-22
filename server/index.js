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
    text: "Doing a small Python project. Caring about #whitespace is the worst!Currently reading: https://t.co/7v4G5AZpvs Dated but educational! #js #designpatternsIncredible chants. https://t.co/iQiljN2WjE #NowPlayingLoving this playlist of Russian listening exercises! https://t.co/PF4rJ8N6z7Tabby Cat is my favorite \"pointless\" Chrome extension: https://t.co/0Ufw5aLaevThe hell is happening?!?!?!?! https://t.co/a3gWvjL4gW@RusEmbUSA Appalling reports of abuse of gays in Chechnya. Russian govt must take action. https://t.co/yTt1fgvXX3@SenMikeLee and @senorrinhatch Please help pressure Russia to stop Chechen Authorities Arresting and Killing Gay Men https://t.co/HriC0QYsJO@jasoninthehouse Please help pressure Russia to stop Chechen Authorities Arresting and Killing Gay Men https://t.co/yTt1fgvXX3Most are familiar but still a bright and colorful treat. https://t.co/e14feuNhJ5Today's agenda: JS problems, then 8 hours of Node tutorial. May have a mini-app to share by the end of it.Humanizing a crisis ⚡️ “A daughter's freedom weighed against her siblings' lives” by @ReutersWorld https://t.co/SiOaI5OU6cGiant robot arm can build a brick house in 48 hours. To be commercially available late 2017. https://t.co/hx3MRlCi4u via @mashableI realize it's the Daily Mail but informative piece on the history of sarin. https://t.co/Xr2jBbp2CGSo much awesome progress in the last few years! Most advanced self-driving cars you can buy today @Thrillist https://t.co/x3Og2awvNZ@jasoninthehouse I'm salty but that's because my best friend is fighting cancer and would be financially devastated… https://t.co/2GFCiIr93z@jasoninthehouse Not gutting coverage for poor Americans = governing.Bloomberg on UT and the Am Dream https://t.co/MQGpNmLAlP via @BV Some right, some wrong, overall interesting to hear outside POV@KarinnaAnne So pretty!My cousin is the best https://t.co/mzJf0G2ghc@KarinnaAnne you should follow @designprobs. It's hilarious.😭 Made me emotional https://t.co/ALnVhzUI8WYou know you're not in academia anymore when your resume is one page again. #ivorytowerprobsDisturbing https://t.co/2D4LupDuHs@SenMikeLee @senorrinhatch @jasoninthehouse Congrats on undermining Americans' right to privacy. #SJRes34As a long-time Windows user, I found this guide to symbols and shortcuts very helpful: https://t.co/WVcPkj3BQh"
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
            console.log(JSON.stringify(response, null, 2));
            res.status(200).send(response);
        }
    })
});

var port = config.PORT;

app.listen(port, function() {
    console.log("Listening on", port);
})