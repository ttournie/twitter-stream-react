import React from 'react';

export default class Tweet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { screenname, author, body} = this.props;
        return (
            <div>
                <div className="tweet">
                    <cite>
                        <a href={"http://www.twitter.com/" + screenname}>{author}</a>
                        <span className="screen-name">@{screenname}</span>
                    </cite>
                    <span className="content">{body}</span>
                </div>
            </div>
        )
    }
}
