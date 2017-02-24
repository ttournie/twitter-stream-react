
export default function tweets(state = {
    tweets: [],
    fetched: false
}, action) {
    //////////////////////////////////////////
    // INITIAL FETCH OF DATA
    //////////////////////////////////////////
    if (action.type === "TWEETS_FETCHED") {
        return {
            ...state,
            tweets: action.payload,
            fetched: true
        }
    }
    if (action.type === "TWEETS_UPDATE") {
        var updated = action.payload;
        var oldTweets = state.tweets;
        oldTweets.unshift(updated)
        // Add length limitation;
        var updatedTweets = oldTweets.slice(0, 10);
        return {
            ...state,
            tweets: updatedTweets,
            fetched: true
        }
    }
    return state;
}
