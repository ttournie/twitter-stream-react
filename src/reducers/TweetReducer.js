
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
    return state;
}
