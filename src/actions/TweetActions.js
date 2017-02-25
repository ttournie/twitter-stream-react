import axios from "axios";
import io from 'socket.io-client'
var socket = io.connect('http://localhost:8080');

// Get all the channels with the current program.
export function getTweets(tags) {
    return function(dispatch) {
        // Start or change the io stream.
        axios.get("http://localhost:8080/", {
                params: {
                    tags: tags,
                }
            })
    }
}

export function initListen() {
    return function(dispatch) {
        // Begin the socket listening Add new Tweet to the component.
        socket.on('tweet', function(tweet){
            dispatch({type: "TWEETS_UPDATE", payload: tweet})
        }.bind(this));
    }
}
