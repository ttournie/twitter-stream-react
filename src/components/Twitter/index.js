import React from 'react';
import { connect } from "react-redux";
import { getTweets } from "../../actions/TweetActions";
import Tweet from "../Tweet";

class Twitter extends React.Component {
    componentWillMount() {
        this.props.dispatch(getTweets());
    }

    render() {
        const { tweets, fetched} = this.props.tweets;
        return (
            <div>
                <h2>Twitter Feed</h2>
                {this.state ?
                    this.state.text :
                    ''
                }

                <div className="tweets">
                    {fetched ?
                        tweets.map(function(tweet, i){
                            return <Tweet
                                key={i}
                                screenname={tweet.screenname}
                                author={tweet.author}
                                body={tweet.body}
                            />



                            //return <p key={i}> {tweet.body} </p>
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