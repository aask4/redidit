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
      redirect: false,
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.cancelPost = this.cancelPost.bind(this);
  }

  onChangeHandler(e) {
    e.preventDefault();
    console.log('Post onChangeHandler: ', e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
      user: this.props.user,
    });
  }

  submitPost(e) {
    e.preventDefault();
    Axios.post('http://localhost:3000/content', this.state)
      .then(() => this.setState({ redirect: true }))
      .catch(err => console.error(`${err}`));
  }

  cancelPost(e) {
    e.preventDefault();
    this.setState({ redirect: true });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <br />
        <form onChange={this.onChangeHandler}>
          <div className="postForm">
            Title:<br />
            <textarea name="title" rows="2" cols="60" />
          </div>
          <br />
          <br />
          <div className="postForm">
            URL:<br />
            <input type="text" name="content" size="62" />
          </div>
          <br />
          <br />
          <div className="postForm">
            Subredidit:<br />
            <select name="subredidit">
              <option key="0" value="">
                Select One
              </option>
              {this.props.subredidits.map(sub => (
                <option key={sub.id} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <br />
        </form>
        <span>
          <input type="submit" value="Submit" onClick={this.submitPost} />{' '}
          <input type="submit" value="Cancel" onClick={this.cancelPost} />
          {this.state.redirect && <Redirect to="/" />}
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
