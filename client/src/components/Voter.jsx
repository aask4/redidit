import React from 'react';

class Voter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="voter">
        <img
          src="https://i.imgur.com/QvlSkAC.png"
          alt="upvote"
          onClick={this.props.upvote}
          className="vote"
        />
        {this.props.score}
        <img
          src="https://i.imgur.com/CX8zaPG.png"
          alt="downvote"
          onClick={this.props.downvote}
          className="vote"
        />
      </div>
    );
  }
}

export default Voter;
