import axios from "axios";
// Get all the channels with the current program.
export function getTweets() {
    return function(dispatch) {
        axios.get("http://localhost:8080/")
            .then((response) => {
                dispatch({type: "TWEETS_FETCHED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "TWEETS_REJECTED", payload: err})
            })
    }
}
