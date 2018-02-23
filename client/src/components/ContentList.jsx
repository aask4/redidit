import React from 'react';
import Axios from 'axios';
import ContentListItem from './ContentListItem.jsx';

class ContentList extends React.Component {
  contructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    Axios.get('/content', { params: { type: 'post' } })
      .then((result) => {
        this.setState({ posts: result });
      })
      .catch(err => console.log('Error in ContentList component: ', err));
  }

  render() {
    return (
      <div className="content-list">
        This is the ContentList Component.
        {this.state.posts.map(post => <ContentListItem post={post} />)}
      </div>
    )
  }
}

export default ContentList;
