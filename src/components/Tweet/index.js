import React from 'react';

export default class Tweet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { screenname, author, body} = this.props;
        return (
                <div className="tweet">
                    <h2 className="title">
                        <a href={"http://www.twitter.com/" + screenname}>{author}</a>
                    </h2>
                    <span className="content">{body}</span>
                </div>
        )
    }
}
