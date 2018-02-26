import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

class PostEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: '',
      content: '',
      url: '',
      parent: 0,
      type: 'post',
      subredidit: '',
      subredidits: [],
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.fetchSubredidits = this.fetchSubredidits.bind(this);
    this.fetchSubredidits();
  }

  onChangeHandler(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      owner: this.props.user.id,
    });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    console.log(this.state);
  }

  fetchSubredidits() {
    Axios.get('/userprofile/subscription')
      .then(({ data }) => {
        const subredidits = [];
        data.forEach((subredidit) => {
          subredidits.push(<option key={subredidit.id} value={subredidit.name}>
              {subredidit.name}
            </option>);
        });
        this.setState({ subredidits });
      })
      .catch(err => console.error('Error in UserProfile component: ', err));
  }

  render() {
    return (
      <div>
        <br />
        <form onChange={this.onChangeHandler} onSubmit={this.onSubmitHandler}>
          <div className="postForm">
            Title:<br />
            <textarea name="title" rows="2" cols="60" />
          </div>
          <br />
          <br />
          <div className="postForm">
            URL:<br />
            <input type="text" name="url" size="62" />
          </div>
          <br />
          <br />
          <div className="postForm">
            Subredidit:<br />
            <select name="subredidit">
              <option>Select</option>
              {this.state.subredidits}
            </select>
          </div>
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.active_user,
  };
}

export default connect(mapStateToProps)(PostEntry);
