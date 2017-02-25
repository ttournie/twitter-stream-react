var Tweet = require('../models/Tweet');

// Process the stream.
module.exports = function(stream, io){

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

        // Save to db.
        tweetEntry.save(function(err) {
            if (!err) {
                // emit the tweet
                io.emit('tweet', tweet);
            }
        });

    });

    stream.on('destroy', function (response) {
        // Clean DB and log msg.
        Tweet.remove({ });
        console.log('Stream destroyed');
    });

};