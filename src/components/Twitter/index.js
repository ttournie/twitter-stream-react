import React from 'react';
import { connect } from "react-redux";
import { getTweets } from "../../actions/TweetActions";
import io from 'socket.io-client'
var socket = io.connect('http://localhost:8080');

class Twitter extends React.Component {
    componentWillMount() {
        this.props.dispatch(getTweets());
        socket.on('tweet', function(tweet){
            this.setState({
                text: tweet.body
            });
        }.bind(this));

    }

    render() {
        const { tweets, fetched}=this.props.tweets;
        console.log(this.state);
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