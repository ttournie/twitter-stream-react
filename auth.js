// Require dependencies
var request = require('request-promise');
var express = require("express");
var path = require("path");
var twitter = require('ntwitter');
var streamHandler = require('./src/utils/streamHandler');
var config = require('./config');
var mongoose = require('mongoose');
var Tweet = require('./src/models/Tweet');

// -create the express instance
var app = express();
var port = process.env.PORT || 8080;

// Connect to our mongo database
mongoose.connect('mongodb://localhost/twitter');


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


// Let express create the server.
var server = app.listen(port);
console.log("Server started");

// Initialize socket.io
var io = require('socket.io').listen(server);
// Variable to store the stream.
var currentStream;

// Send the tweets to the client.
app.get("/", (req, res) => {
    var tags = req.param("tags")
    if (tags != "") {
        // Destroy the stream before opening a new one.
        if (typeof currentStream !== 'undefined') {
            currentStream.destroy();
        }

        // Set a stream listener for tweets.
        twit.stream('statuses/filter',{ track: tags}, function(stream){
            streamHandler(stream,io);
            currentStream = stream;
        });
    }
});