import axios from "axios";
import io from 'socket.io-client'
var socket = io.connect('http://localhost:8080');

// Get all the channels with the current program.
export function getTweets(tags) {
    return function(dispatch) {
        axios.get("http://localhost:8080/")
            .then((response) => {
                dispatch({type: "TWEETS_FETCHED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "TWEETS_REJECTED", payload: err})
            })
        socket.on('tweet', function(tweet){
            console.log(tweet);
            dispatch({type: "TWEETS_UPDATE", payload: tweet})
        }.bind(this));
    }
}
