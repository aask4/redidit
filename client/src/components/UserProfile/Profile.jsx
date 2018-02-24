import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Axios from 'axios';
import UserPostItem from './UserPostItem';
import UserCommentItem from './UserCommItem';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: '',
      comments: '',
      postScore: '',
      commentScore: '',
      showPosts: true,
      showComments: false,
    };
    this.fetchUserContent.bind(this);
  }

  componentDidMount() {
    this.fetchUserContent();
  }

  fetchUserContent() {
    Axios.get('/content', { params: { owner: `${this.props.selectedUser}` } })
      .then((content) => {
        let postScore = 0;
        let commentScore = 0;
        const posts = [];
        const comments = [];
        content.forEach((item) => {
          if (item.type === 'post') {
            postScore += 1;
            posts.push(item);
          } else {
            commentScore += 1;
            comments.push(item);
          }
        });
        this.setState({
          posts,
          comments,
          postScore,
          commentScore,
        });
      })
      .catch(err => console.error('Error in ContentList component: ', err));
  }

  togglePosts() {
    this.setState({
      showPosts: true,
      showComments: false,
    });
  }

  toggleComments() {
    this.setState({
      showPosts: false,
      showComments: true,
    });
  }

  render() {
    return (
      <div style={{ float: 'center' }}>
        <h2>{this.props.selectedUser}</h2>
        <ul>
          <li>{this.state.postScore}</li>
          <li>{this.state.commentScore}</li>
        </ul>
        <br />
        <button onClick={this.togglePosts}>Posts</button>
        <button onClick={this.toggleComments}>Comments</button>
        {this.state.showPosts &&
          this.state.posts.map((post, key) => <UserPostItem post={post} key={key} />)}
        {this.state.showComments &&
          this.state.comments.map((comm, key) => <UserCommentItem comm={comm} key={key} />)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedUser: state.selectedUser,
    currentPosts: state.current_posts,
    currentComments: state.current_comments,
  };
}

export default connect(mapStateToProps)(UserProfile);
