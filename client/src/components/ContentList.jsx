import React from 'react';
import Axios from 'axios';
import ContentListItem from './ContentListItem.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPosts } from '../actions';

class ContentList extends React.Component {
  constructor(props) {
    super(props);
    console.log('INSIDE CONTENTLIST CONSTRUCTR: ');
  }

  componentDidMount() {
    // this.props.addPosts({ name: 'haha' });
    Axios.get('/content', { params: { type: 'post' } })
      .then((result) => {
        console.log('THIS IS WHAT I GET BACK AS RESULT ', result.data);
        this.props.addPosts(result.data);
      })
      .catch(err => console.log('Error in ContentList component: ', err));
  }

  render() {
    return (
      <div className="content-list">
        This is the ContentList Component.
        {this.props.posts ? (
          <div>
            <ContentListItem post={this.props.posts[0]} />
          </div>
        ) : (
          <div>no posts</div>
        )}
        {/* this.props.posts.map(post => <ContentListItem post={post} />) */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.current_posts,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ addPosts }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ContentList);
