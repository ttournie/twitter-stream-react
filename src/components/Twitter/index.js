import React from 'react';
import { connect } from "react-redux";
import { getTweets } from "../../actions/TweetActions";

class Twitter extends React.Component {
    componentWillMount() {
        this.props.dispatch(getTweets());
    }

    render() {
        const { tweets, fetched}=this.props.tweets;
        console.log(tweets);
        return (
            <div>
                <h2>Twitter Feed</h2>
                <div className="tweets">
                    {fetched ?
                        tweets.map(function(tweet, i){
                            return <p key={i}> {tweet.text} </p>
                        })
                        :
                        <p>Loading tweets</p>
                    }
                </div>
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