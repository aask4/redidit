import React from "react";
import Axios from "axios";
import Moment from "moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { selectUser, addPosts, addActiveSubredidit } from "../actions";
import Voter from "./Voter.jsx";

class ContentListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      comments: [],
      showComments: false,
      post: this.props.post
    };
    this.showCommentsHandler = this.showCommentsHandler.bind(this);
    this.postComment = this.postComment.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.contentManager = this.contentManager.bind(this);
    this.selectUserHandler = this.selectUserHandler.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.voteHandler = this.voteHandler.bind(this);
  }

  componentDidMount() {
    console.log("POST ID: ", this.props.post.id);
    Axios.get("/content", { params: { parent: this.props.post.id } })
      .then(result => {
        console.log("RESULT>DATA: ", result.data);
        this.setState({ comments: result.data });
      })
      .catch(err => console.log("Error in ComponentListItem: ", err));
  }

  showCommentsHandler() {
    this.setState({ showComments: !this.state.showComments });
  }

  postComment(event) {
    event.preventDefault();
    if (this.state.comment.length === 0) return;
    Axios.post("/content", {
      user: this.props.user,
      content: this.state.comment,
      type: "comment",
      parent: this.props.post.id
    })
      .then(result => {
        this.setState({
          comments: this.state.comments.concat([result.data])
        });
      })
      .catch(err => {
        console.log("Error in ContentListItem postComment: ", err);
        alert("Please Log In To Comment");
      });
    this.setState({ comment: "" });
  }

  onChangeHandler(event) {
    this.setState({ comment: event.target.value });
  }

  contentManager() {
    return this.props.post.type === "post" ? (
      <a href={this.props.post.content}>{this.props.post.content}</a>
    ) : (
      <span>{this.props.post.content}</span>
    );
  }

  selectUserHandler(event) {
    event.preventDefault();
    this.props.selectUser(this.props.post.owner);
    Axios.get("/userprofile")
      .then(result => console.log("success"))
      .catch(err => console.log("SELECT USER HANDLER ERROR: ", err));
  }

  subrediditHandler() {
    let subName = this.props.post.subredidit;
    let subredidit;

    this.props.subredidits.forEach(sub => {
      if (sub.name === subName) {
        subredidit = sub;
      }
    });
    this.props.addActiveSubredidit(subredidit);
  }

  voteHandler(change) {
    if (this.props.user) {
      Axios.put("/content", {
        user_id: this.props.user.id,
        content_id: this.props.post.id,
        newScore: this.state.post.score + change,
        oldScore: this.state.post.score
      })
        .then(result => {
          console.log("UPVOTE result.data: >> ", result.data[0]);
          const updatedPost = Object.assign(this.state.post);
          updatedPost.score = result.data[0];
          this.setState({ post: updatedPost });
        })
        .catch(err => console.log(err));
    } else {
      alert("Please Log In To Vote");
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
            score={this.props.post.score}
            user={this.props.user}
          />
        </div>
        {this.props.post.title ? (
          <h3 className="post-title">{this.props.post.title}</h3>
        ) : null}
        <div className="info">
          <h4 className="owner-name" onClick={this.selectUserHandler}>
            <Link to="/userprofile">{this.props.post.owner}</Link>
          </h4>
          {this.props.post.type === "post" ? (
            <h5 className="sublink" onClick={e => this.subrediditHandler(e)}>
              /rd/{this.props.post.subredidit}
            </h5>
          ) : (
            ""
          )}
          <span className="timestamp">
            {Moment(this.props.post.createdAt).fromNow()}
          </span>
        </div>
        <div className="message">
          {this.contentManager()}
          <div className="comment-section">
            <button onClick={this.postComment}>Comment</button>
            <input
              type="text"
              onChange={this.onChangeHandler}
              value={this.state.comment}
            />
            <span
              onClick={
                this.state.comments.length > 0
                  ? this.showCommentsHandler
                  : () => {}
              }
            >
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
                    <ContentListItem post={comm} user={this.props.user} />
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
    addPosts: state.addPosts,
    subredidits: state.all_subredidit
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    { selectUser, addPosts, addActiveSubredidit },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(ContentListItem);
