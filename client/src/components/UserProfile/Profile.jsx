import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import ContentListItem from '../ContentListItem';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      postScore: '',
      commentScore: '',
    };
    this.fetchUserContent = this.fetchUserContent.bind(this);
  }

  componentWillMount() {
    this.fetchUserContent();
  }

  componentDidMount() {
    this.fetchUserContent();
  }

  fetchUserContent() {
    console.log(this.props.selectedUser);
    Axios.get('/content', {
      params: { where: { owner: this.props.selectedUser } },
    })
      .then(({ data }) => {
        let postScore = 0;
        let commentScore = 0;
        const posts = [];

        data.forEach((item) => {
          item.type === 'post'
            ? ((postScore += item.score), posts.push(item))
            : (commentScore += item.score);
        });
        this.setState({
          posts,
          postScore,
          commentScore,
        });
      })
      .catch(err => console.error('Error in UserProfile component: ', err));
  }

  render() {
    return (
      <div style={{ float: 'center' }}>
        <Link to="/">Back to Front Page</Link>
        <h2>{this.props.selectedUser}</h2>
        <h4>
          <ul>
            <li>Posts Score: {this.state.postScore}</li>
            <li>Comments Score: {this.state.commentScore}</li>
          </ul>
        </h4>
        <br />
        <h3>Overview</h3>
        {this.state.posts.length &&
          this.state.posts.map(post => (
            <div className="content-item" key={post.id}>
              <ContentListItem post={post} user={this.props.user} />
            </div>
          ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedUser: state.selectedUser,
    user: state.active_user,
  };
}

export default connect(mapStateToProps)(UserProfile);
