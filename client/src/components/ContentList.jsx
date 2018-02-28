import React from 'react';
import Axios from 'axios';
import ContentListItem from './ContentListItem.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPosts } from '../actions';

class ContentList extends React.Component {
  constructor(props) {
    super(props);
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts() {
    const limit = this.props.posts ? this.props.posts.length + 25 : 25;
    const subredidit =
      (this.props.active_subredidit && this.props.active_subredidit.name) || undefined;
    Axios.get('/content', { params: { where: { type: 'post', subredidit }, limit } })
      .then((result) => {
        this.props.addPosts(result.data);
      })
      .catch(err => console.log('Error in ContentList component: ', err));
  }

  render() {
    return (
      <div className="content-list">
        {this.props.posts ? (
          this.props.posts.map(post => (
            <div className="content-item" key={post.id}>
              <ContentListItem post={post} user={this.props.user} />
            </div>
          ))
        ) : (
          <div>no posts</div>
        )}
        <input type="submit" onClick={this.fetchPosts} value="Show More Posts" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.current_posts,
    user: state.active_user,
    active_subredidit: state.active_subredidit,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ addPosts }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ContentList);
