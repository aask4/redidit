import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectUser } from '../actions';

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
    this.contentManager = this.contentManager.bind(this);
    this.selectUserHandler = this.selectUserHandler.bind(this);
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

  postComment(event) {
    event.preventDefault();
    console.log(JSON.stringify(this.props));
    Axios.post('/content', {
      owner: this.props.user.username,
      content: this.state.comment,
      type: 'comment',
      parent: this.props.post.id,
    })
      .then((result) => {
        console.log('POST COMMENT STATE.COMMENTS && RESULT ', this.state.comments, result);
        this.setState({
          comments: this.state.comments.concat([result.data]),
        });
      })
      .catch(err => console.log('Error in ContentListItem postComment: ', err));
  }

  onChangeHandler(event) {
    this.setState({ comment: event.target.value });
  }

  contentManager() {
    return this.props.post.type === 'post' ? (
      <a href={this.props.post.content}>{this.props.post.content}</a>
    ) : (
      <span>{this.props.post.content}</span>
    );
  }

  selectUserHandler(event) {
    event.preventDefault();
    this.props.selectUser(this.props.post.owner);
    Axios.get('/userprofile')
      .then(result => console.log('success'))
      .catch(err => console.log('SELECT USER HANDLER ERROR: ', err));
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
          <h4 className="owner-name" onClick={this.selectUserHandler}>
            {this.props.post.owner}{' '}
          </h4>
          {this.props.post.type === 'post' ? <h5>/rd/{this.props.post.subredidit}</h5> : ''}
          <span className="timestamp">{this.props.post.createdAt}</span>
        </div>
        <div className="message">
          {this.contentManager()}
          <div className="comment-section">
            <button onClick={this.postComment}>Comment</button>
            <input type="text" onChange={this.onChangeHandler} />
            <span>
              {this.state.comments.length}
              <span onClick={this.showCommentsHandler}>Comments</span>
            </span>
          </div>
        </div>
        <div>
          {this.state.showComments ? (
            <div className="comments">
              <div className="spacer">&nbsp</div>
              {this.state.comments.map(comm => (
                <ContentListItem post={comm} user={this.props.user} />
              ))}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.active_user,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ContentListItem);
