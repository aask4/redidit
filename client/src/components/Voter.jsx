import React from 'react';

class Voter extends React.Component {
  constructor(props) {
    super(props);
    this.scoreColor = this.scoreColor.bind(this);
  }

  scoreColor() {
    if (this.props.score > 0) {
      return 'good';
    } else if (this.props.score < 0) {
      return 'bad';
    }
    return '';
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
        <p className={this.scoreColor()}>{this.props.score}</p>
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
