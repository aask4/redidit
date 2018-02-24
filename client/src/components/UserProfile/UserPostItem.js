import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

class UserPostItem extends React.Component {
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
          {/* <span className="subredidit">{this.props.post.subRedidit}</span> */}
          <span className="timestamp">{this.props.content.createdAt}</span>
        </div>
        <div>
          <a href={this.props.content.content}>{this.props.content.content}</a>
        </div>
      </div>
    );
  }
}

export default UserPostItem;
