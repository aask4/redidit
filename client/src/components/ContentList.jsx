import React from 'react';
import Axios from 'axios';
import ContentListItem from './ContentListItem.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPosts } from '../action';

class ContentList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Axios.get('/content', { params: { type: 'post' } })
      .then((result) => {
        this.props.addPosts(result);
      })
      .catch(err => console.log('Error in ContentList component: ', err));
  }

  render() {
    return (
      <div className="content-list">
        This is the ContentList Component.
        {this.props.current_posts.map(post => <ContentListItem post={post} />)}
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
