import React from 'react';
import { getTweets } from "../../actions/TweetActions";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.SearchKeywords = this.SearchKeywords.bind(this);

    }

    SearchKeywords() {
        console.log('test');
    }

    render() {
        return (
            <div className="search">
                <label for="search">Search</label>
                <input type="text" id="search"/>
                <input type="button" id="submit" value="Search" onClick={this.SearchKeywords}/>
            </div>
        )
    }
}