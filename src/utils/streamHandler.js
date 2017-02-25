var Tweet = require('../models/Tweet');

// Process the stream.
module.exports = function(stream, io){

    // When tweets get sent our way ...
    stream.on('data', function(data) {

        // Construct a new tweet object
        var tweet = {
            twid: data['id'],
            author: data['user']['name'],
            avatar: data['user']['profile_image_url'],
            body: data['text'],
            date: data['created_at'],
            screenname: data['user']['screen_name']
        };

        // Create a new model instance with our object
        var tweetEntry = new Tweet(tweet);
        //console.log(tweet);

        // Save 'er to the database
        tweetEntry.save(function(err) {
            if (!err) {
                // If everything is cool, socket.io emits the tweet.
                io.emit('tweet', tweet);
            }
        });

    });

    stream.on('destroy', function (response) {
        Tweet.remove({ });
        stream.active = false;
        console.log(stream);
        console.log('Stream destroyed');
    });

};