
export default function tweets(state = {
    tweets: [],
    fetched: false
}, action) {
    // Update the tweet list.
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
    // Clean the old tweets.
    if (action.type === "NEW_SEARCH") {
        return {
            ...state,
            tweets: [],
        }
    }
    return state;
}
