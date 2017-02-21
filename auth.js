// Require dependencies
var OAuth = require('oauth');
var request = require('request-promise');
var express = require("express");
var path = require("path");
var twitter = require('ntwitter');
var apiResponse = null;
var config = require('./config');

// -create the express instance
var app = express();
var port = process.env.PORT || 8080;



/////////////////////////////////////////////
// ALLOW CORS TO localhost:3000 dev server
/////////////////////////////////////////////
const allowCrossDomain = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
}

// Create a new ntwitter instance
var twit = new twitter(config.twitter);

/////////////////////////////////////////////
// APP CONFIGURATION
/////////////////////////////////////////////
app.use(allowCrossDomain);

var OAuth2 = OAuth.OAuth2;
var twitterConsumerKey = '6aSm4WOlxNn8uzKUsMavv8d1A';
var twitterConsumerSecret = '7i4Gg8Ib3nXQ4o4PpkVv3zL7GH6ueUmo3XtTpcxLGcufVUan6u';
var oauth2 = new OAuth2(
    twitterConsumerKey,
    twitterConsumerSecret,
    'https://api.twitter.com/',
    null,
    'oauth2/token',
    null);

app.get("/", (req, res) => {
    oauth2.getOAuthAccessToken(
        '',
        {'grant_type':'client_credentials'},
        function (e, access_token, refresh_token, results){
            console.log('access token: ',access_token);
            var options = {
                url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=Lastationphoto',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            };

            request(options).then(function (body){
                    apiResponse = JSON.parse(body);
                    res.send(apiResponse);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
});

// Let express create the server.
var server = app.listen(port);
console.log("Server started");

// Initialize socket.io
var io = require('socket.io').listen(server);

// Set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter',{ track: '#TheBachelor'}, function(stream){
    //streamHandler(stream,io);
    stream.on('data', function(data) {
        console.log(data);
        // Construct a new tweet object
        var tweet = {
            twid: data['id'],
            active: false,
            author: data['user']['name'],
            avatar: data['user']['profile_image_url'],
            body: data['text'],
            date: data['created_at'],
            screenname: data['user']['screen_name']
        };

        // If everything is cool, socket.io emits the tweet.
        io.emit('tweet', tweet);

    });
});