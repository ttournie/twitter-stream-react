import { combineReducers } from "redux";
import tweets from "./TweetReducer";

const reducer = combineReducers({
    tweets
})

export default reducer;