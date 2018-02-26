import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { selectUser } from '../actions';
import Voter from './Voter.jsx';

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
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
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

  upvote() {
    console.log('upvote!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', this.props.post.content);
    const upScore = this.props.updateScore;
    Axios.put('/content', {
      user_id: this.props.user.id,
      content_id: this.props.post.id,
      score: this.props.post.score + 1,
    })
      .then(result => upScore(result.data[0], this.props.index))
      .catch(err => console.log(err));
  }

  downvote() {
    console.log('down vote!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', this.props.post.content);
  }

  render() {
    return (
      <div>
        <div className="voting">
          <Voter
            upvote={this.upvote}
            downvote={this.downvote}
            score={this.props.post.score}
            user={this.props.user}
          />
        </div>
        <h3 className="post-title">{this.props.post.title}</h3>
        <div className="info">
          <h4 className="owner-name" onClick={this.selectUserHandler}>
            <Link to="/userprofile">{this.props.post.owner} </Link>
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
              <div className="spacer" />
              <div className="comment-item">
                {this.state.comments.map(comm => (
                  <ContentListItem post={comm} user={this.props.user} key={comm.id} />
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
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ selectUser }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ContentListItem);
