import React from 'react';
import Axios from 'axios';
import Moment from 'moment';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { selectUser, addPosts, addActiveSubredidit } from '../actions';
import Voter from './Voter.jsx';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
      showComments: false,
      post: this.props.post,
      showCommentInput: this.props.post.type === 'post',
    };
    this.showCommentsHandler = this.showCommentsHandler.bind(this);
    this.postComment = this.postComment.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.contentManager = this.contentManager.bind(this);
    this.selectUserHandler = this.selectUserHandler.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.voteHandler = this.voteHandler.bind(this);
    this.toggleCommentInput = this.toggleCommentInput.bind(this);
    this.commentInputManager = this.commentInputManager.bind(this);
  }

  componentDidMount() {
    Axios.get('/content', { params: { where: { parent: this.props.post.id } } })
      .then((result) => {
        this.setState({ comments: result.data });
      })
      .catch(err => console.log('Error in ComponentListItem: ', err));
  }

  showCommentsHandler() {
    this.setState({ showComments: !this.state.showComments });
  }

  postComment(event) {
    event.preventDefault();
    if (this.state.comment.length === 0) return;
    Axios.post('/content', {
      user: this.props.user,
      content: this.state.comment,
      type: 'comment',
      parent: this.props.post.id,
    })
      .then((result) => {
        const newComments = this.state.comments.slice();
        newComments.unshift(result.data);
        this.setState({
          comments: newComments,
        });
      })
      .catch((err) => {
        console.log('Error in ContentListItem postComment: ', err);
        alert('Please Log In To Comment');
      });
    if (this.props.post.type === 'comment') {
      this.setState({ showCommentInput: !this.state.showCommentInput });
    }
    this.setState({ comment: '' });
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
    this.props.selectUser(this.props.post.owner);
    this.props.fetchUserContent && this.props.fetchUserContent(this.props.post.owner);
  }

  subrediditHandler() {
    const subName = this.props.post.subredidit;
    let subredidit;

    this.props.subredidits.forEach((sub) => {
      if (sub.name === subName) {
        subredidit = sub;
      }
    });
    this.props.addActiveSubredidit(subredidit);
  }

  toggleCommentInput() {
    this.setState({ showCommentInput: !this.state.showCommentInput });
  }

  commentInputManager() {
    return this.props.post.type === 'post' || this.state.showCommentInput ? (
      <div className="comment-input">
        <button onClick={this.postComment}>Comment</button>
        <input
          type="text"
          onChange={this.onChangeHandler}
          value={this.state.comment}
          maxLength="255"
        />
      </div>
    ) : (
      <span className="reply" onClick={this.toggleCommentInput}>
        reply
      </span>
    );
  }

  voteHandler(change) {
    if (this.props.user) {
      Axios.put('/content', {
        user_id: this.props.user.id,
        content_id: this.props.post.id,
        newScore: this.state.post.score + change,
        oldScore: this.state.post.score,
      })
        .then((result) => {
          const updatedPost = Object.assign(this.state.post);
          updatedPost.score = result.data.score;
          this.setState({ post: updatedPost });
        })
        .catch(err => console.log(err));
    } else {
      alert('Please Log In To Vote');
    }
  }

  upvote() {
    this.voteHandler(1);
  }

  downvote() {
    this.voteHandler(-1);
  }

  render() {
    return (
      <div>
        <div className="voting">
          <Voter
            upvote={this.upvote}
            downvote={this.downvote}
            score={this.state.post.score}
            user={this.props.user}
          />
        </div>
        {this.props.post.title ? <h3 className="post-title">{this.props.post.title}</h3> : null}
        <div className="info">
          <h4 className="owner-name" onClick={this.selectUserHandler}>
            <Link to={`/userprofile/${this.props.post.owner}`}>{this.props.post.owner}</Link>
          </h4>
          {this.props.post.type === 'post' ? (
            <h5 className="sublink" onClick={e => this.subrediditHandler(e)}>
              /rd/<Link to="/subredidit">{this.props.post.subredidit}</Link>
            </h5>
          ) : (
            ''
          )}
          <span className="timestamp">{Moment(this.props.post.createdAt).fromNow()}</span>
        </div>
        <div className="message">
          {this.contentManager()}
          <div className="comment-section">
            {this.commentInputManager()}
            <span onClick={this.state.comments.length > 0 ? this.showCommentsHandler : () => {}}>
              {this.state.comments.length} Comments
            </span>
          </div>
        </div>
        <div>
          {this.state.showComments ? (
            <div className="comments">
              <div className="spacer" />
              <div className="comment-list">
                {this.state.comments.map(comm => (
                  <div className="comment-item" key={comm.id}>
                    <ContentListItem
                      post={comm}
                      user={this.props.user}
                      fetchUserContent={this.props.fetchUserContent}
                    />
                  </div>
                ))}
              </div>
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
    subredidits: state.all_subredidit,
    selectedUser: state.selectedUser,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser, addPosts, addActiveSubredidit }, dispatch);
}

const ContentListItem = connect(mapStateToProps, matchDispatchToProps)(ListItem);
export default ContentListItem;
