import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addComments } from '../action';

class ContentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      showComments: false,
    };
    this.showCommentsHandler = this.showCommentsHandler.bind(this);
    this.postComment = this.postComment.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    Axios.get('/content', { params: { parent: this.props.post.id } })
      .then(result => this.setState({ comments: result }))
      .catch(err => console.log('Error in ComponentListItem: ', err));
  }

  showCommentsHandler() {
    this.setState({ showComments: !this.state.showComments });
  }

  postComment() {
    Axios.post('/content', {
      owner: state.user.id,
      content: this.state.comment,
      type: 'comment',
      parent: this.props.post.id,
    })
      .then(result => this.state.comments.push(result))
      .catch(err => console.log('Error in ContentListItem postComment: ', err));
  }

  onChangeHandler(event) {
    this.setState({ comment: event.target.value });
  }

  render() {
    return (
      <div className="content-item">
        <div className="voting">
          <button>upvote</button>
          <br />
          {this.props.post.score}
          <br />
          <button>downvote</button>
        </div>
        <div>
          <span className="owner-name">{this.props.post.owner}</span>
          <span className="timestamp">{this.props.post.createdAt}</span>
        </div>
        <div>
          <a href={this.props.post.content}>{this.props.post.content}</a>
        </div>
        <div>
          <button onClick={this.postComment}>Comment</button>
          <input type="text" onChange={this.onChangeHandler} />
          <span>
            {this.state.comments.length}
            <span onClick={this.showCommentsHandler}>Comments</span>
          </span>
        </div>
        {showComments ? (
          <div className="comments">
            <span className="spacer">spacer</span>
            Comment Comment
            {this.state.comments.map(comm => <ContentListItem post={comm} />)}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default ContentListItem;
