import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

class UserCommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
          <span className="comment">{this.props.comm.content}</span>
        </div>
      </div>
    );
  }
}

export default UserCommentItem;
