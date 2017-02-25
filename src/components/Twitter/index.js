import React from 'react';
import { connect } from "react-redux";
import { getTweets } from "../../actions/TweetActions";
import { initListen } from "../../actions/TweetActions";
import Tweet from "../Tweet";


class Twitter extends React.Component {
    componentWillMount() {
        this.props.dispatch(initListen());
    }

    SearchKeywords() {
        var tags = document.getElementById('search').value
        this.props.dispatch(getTweets(tags));
    }


    render() {
        const { tweets, fetched} = this.props.tweets;
        return (
            <div className="main">

                <div className="search">
                    <label htmlFor="search">Search</label>
                    <input className="searchText" type="text" id="search" name="search"/>
                    <input className="searchButton" type="button" id="submit" value="Search" onClick={this.SearchKeywords.bind(this)}/>
                </div>

                <h2>Twitter Feed</h2>

                <section className="tweets">
                    {fetched ?
                        tweets.map(function(tweet, i){
                            return <Tweet
                                key={i}
                                screenname={tweet.screenname}
                                author={tweet.author}
                                body={tweet.body}
                                avatar={tweet.avatar}
                            />

                        })
                        :
                        <div className="emptyTweet"><p>Waiting for input</p></div>
                    }
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tweets: state.tweets
    }
}

export default connect(mapStateToProps)(Twitter);