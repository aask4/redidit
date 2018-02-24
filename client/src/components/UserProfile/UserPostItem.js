import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addComments } from '../actions';

class UserPostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.showCommentsHandler = this.showCommentsHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  routeToPost() {}

  routeToSubredidit() {}

  render() {
    return (
      <div className="content-item">
        <div>
          <span className="subredidit">{this.props.post.subRedidit}</span>
          <span className="timestamp">{this.props.post.createdAt}</span>
        </div>
        <div>
          <a href={this.props.post.content}>{this.props.post.content}</a>
        </div>
      </div>
    );
  }
}

export default UserPostItem;
