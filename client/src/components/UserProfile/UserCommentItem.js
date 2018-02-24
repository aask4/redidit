import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addComments } from '../actions';

class UserCommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.showCommentsHandler = this.showCommentsHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {}

  routeToPost() {}

  routeToSubredidit() {}

  render() {
    return (
      <div className="content-item">
        <div>
          <span className="subredidit" onClick={this.routeToSubredidit}>
            {this.props.comm.subredidit}
          </span>
          <span className="timestamp">{this.props.comm.createdAt}</span>
          <span classname="comment">{this.props.comm.content}</span>
        </div>
      </div>
    );
  }
}

export default UserCommentItem;
