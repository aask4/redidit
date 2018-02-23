import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { addActiveUser } from '../actions';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: '',
      comments: '',
      postScore: '',
      commentScore: '',
    };
  }

  componentDidMount() {
    this.fetchUserPosts();
  }

  fetchUserPosts() {
    const userPosts = this.props.currentPosts.filter(post => post.owner === this.props.selectedUser);
    this.setState({
      posts: userPosts,
    });
  }

  fetchUserComments() {
    const userComments = this.props.currentComments.filter(comment => comment.owner === this.props.selectedUser);
    this.setState({
      posts: userComments,
    });
  }

  onchangeHandler(e) {}

  render() {
    return (
      <div style={{ float: 'center' }}>
        <h2>{this.props.selectedUser}</h2>
        <ul>
          <li>{this.state.postScore}</li>
          <li>{this.state.commentScore}</li>
        </ul>
        <br />
        <div>{this.state.error ? <div>{this.state.error}</div> : null}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    selectedUser: state.selectedUser,
    currentPosts: state.current_posts,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UserProfile);
