import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import UserPostItem from './UserPostItem';
import UserCommentItem from './UserCommentItem';
import ContentListItem from '../ContentListItem';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      postScore: '',
      commentScore: '',
    };
    this.fetchUserContent = this.fetchUserContent.bind(this);
  }

  componentWillMount() {
    this.fetchUserContent();
  }

  fetchUserContent() {
    Axios.get('/content', { params: { owner: 1, type: 'post' } })
      .then(({ data }) => {
        let postScore = 0;
        let commentScore = 0;
        data.forEach((item) => {
          item.type === 'post' ? (postScore += 1) : (commentScore += 1);
        });
        this.setState({
          data,
          postScore,
          commentScore,
        });
      })
      .catch(err => console.error('Error in UserProfile component: ', err));
  }

  render() {
    return (
      <div style={{ float: 'center' }}>
        <h1>Hello from userprofile</h1>
        <h2>{this.props.selectedUser}</h2>
        <h4>
          <ul>
            <li>Posts Score: {this.state.postScore}</li>
            <li>Comments Score: {this.state.commentScore}</li>
          </ul>
        </h4>
        <br />
        <h3>Overview</h3>
        {this.state.data.length &&
          this.state.data.map((content, key) => <ContentListItem post={content} key={key} />)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedUser: state.selectedUser,
  };
}

export default connect(mapStateToProps)(UserProfile);
