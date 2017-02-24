import React from 'react';
import { connect } from "react-redux";
import { getTweets } from "../../actions/TweetActions";
import Tweet from "../Tweet";


class Twitter extends React.Component {
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
                    <input type="text" id="search" name="search"/>
                    <input type="button" id="submit" value="Search" onClick={this.SearchKeywords.bind(this)}/>
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
                        <p>Waiting for input</p>
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