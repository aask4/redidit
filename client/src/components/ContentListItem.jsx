import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ContentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
      showComments: false,
    };
    this.showCommentsHandler = this.showCommentsHandler.bind(this);
    this.postComment = this.postComment.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    console.log('POST ID: ', this.props.post.id);
    Axios.get('/content', { params: { parent: this.props.post.id } })
      .then((result) => {
        console.log('RESULT>DATA: ', result.data);
        this.setState({ comments: result.data });
      })
      .catch(err => console.log('Error in ComponentListItem: ', err));
  }

  showCommentsHandler() {
    this.setState({ showComments: !this.state.showComments });
  }

  postComment() {
    Axios.post('/content', {
      owner: this.state.user.id,
      content: this.state.comment,
      type: 'comment',
      parent: this.props.post.id,
    })
      .then(result =>
        this.setState({
          comments: this.state.comments.concat([result]),
        }))
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
        <div className="info">
          <span className="owner-name">
            {this.props.post.owner} <span className="timestamp">{this.props.post.createdAt}</span>
          </span>
        </div>
        <div className="message">
          <a href={this.props.post.content}>{this.props.post.content}</a>
        </div>
        <div className="comment-section">
          <button onClick={this.postComment}>Comment</button>
          <input type="text" onChange={this.onChangeHandler} />
          <span>
            {this.state.comments.length}
            <span onClick={this.showCommentsHandler}>Comments</span>
          </span>
        </div>
        {this.state.showComments ? (
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
