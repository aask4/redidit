import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Axios from 'axios';

class PostEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      owner: '',
      content: '',
      parent: 0,
      type: 'post',
      subredidit: '',
      subredidits: [],
      toggleRedirect: false,
      toggleMissingFields: false,
      toggleInvalidUser: false,
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.cancelPost = this.cancelPost.bind(this);
  }

  onChangeHandler(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      user: this.props.user,
    });
  }

  submitPost(e) {
    e.preventDefault();
    if (this.state.title && this.state.content && this.state.subredidit) {
      Axios.post('/content', this.state)
        .then(() => this.setState({ toggleRedirect: true }))
        .catch(err => console.error(`${err}`));
    } else if (!this.props.user) {
      this.setState({ toggleInvalidUser: true });
    } else {
      this.setState({
        toggleInvalidUser: false,
        toggleMissingFields: true,
      });
    }
  }

  cancelPost(e) {
    e.preventDefault();
    this.setState({ toggleRedirect: true });
  }

  render() {
    return (
      <div>
        <br />
        <form onChange={this.onChangeHandler}>
          <div className="postForm">
            *Title:<br />
            <textarea name="title" rows="2" cols="60" maxLength="255" />
          </div>
          <br />
          <br />
          <div className="postForm">
            *URL:<br />
            <input type="text" name="content" size="62" maxLength="255" />
          </div>
          <br />
          <br />
          <div className="postForm">
            *Subredidit:<br />
            <select name="subredidit">
              <option key="0" value="">
                Select One
              </option>
              {this.props.subredidits &&
                this.props.subredidits.map(sub => (
                  <option key={sub.id} value={sub.name}>
                    {sub.name}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <br />
        </form>
        {this.state.toggleMissingFields && <div>*Required fields must be complete!</div>}
        {this.state.toggleInvalidUser && <div>Must be signed in to submit post!</div>}
        <span>
          <input type="submit" value="Submit" onClick={this.submitPost} />{' '}
          <input type="submit" value="Cancel" onClick={this.cancelPost} />
          {this.state.toggleRedirect && <Redirect to="/" />}
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.active_user,
    subredidits: state.all_subredidit,
  };
}

export default connect(mapStateToProps)(PostEntry);
