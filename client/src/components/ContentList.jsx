import React from 'react';
import Axios from 'axios';
import ContentListItem from './ContentListItem.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPosts } from '../actions';

class ContentList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Axios.get('/content', { params: { type: 'post' } })
      .then((result) => {
        this.props.addPosts(result.data);
      })
      .catch(err => console.log('Error in ContentList component: ', err));
  }

  render() {
    console.log('THIS IS PROPS IN CONTENT LIST: ', this.props);
    return (
      <div className="content-list">
        {this.props.posts ? (
          this.props.posts.map(post => (
            <div className="content-item">
              <ContentListItem post={post} user={this.props.user} key={post.id} />
            </div>
          ))
        ) : (
          <div>no posts</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.current_posts,
    user: state.active_user,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ addPosts }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ContentList);
