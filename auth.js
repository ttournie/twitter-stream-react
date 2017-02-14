// Require dependencies
var OAuth = require('oauth');
var request = require('request-promise');
var express = require("express");
var path = require("path");
var twitter = require('ntwitter');
var apiResponse = null;

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
var twitterConsumerKey = 'GiePaJCNVnKM4g69p6CdUnBZR';
var twitterConsumerSecret = 'XYHoTEJUOUW53gE7a35s0VBul0YyFOMF284p7VHrA1W1DbUO51';
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
/*twit.stream('statuses/filter',{ track: 'scotch_io, #scotchio'}, function(stream){
    streamHandler(stream,io);
});*/