import React from 'react';

export default class Tweet extends React.Component {
    render() {
        const { screenname, author, body, avatar} = this.props;
        return (
                <div className="tweet">
                    <img className="avatar" src={avatar}></img>
                    <h2 className="title">
                        <a href={"http://www.twitter.com/" + screenname}>{author}</a>
                    </h2>
                    <span className="content">{body}</span>
                </div>
        )
    }
}
