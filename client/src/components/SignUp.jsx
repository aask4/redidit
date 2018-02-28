import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addActiveUser } from '../actions';
import axios from 'axios';
import firebase from '../firebase';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      submitEmail: false,
      errorUsername: false,
      errorPassword: false,
    };
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit() {
    const info = this.state;
    if (info.password.length < 6) {
      this.setState({ errorPassword: true });
    } else {
      axios
        .post('/signup', info)
        .then((res) => {
          if (!res.data.username) {
            this.setState({
              errorUsername: true,
            });
          } else {
            window.localStorage.clear();
            firebase.signup(info.email, info.password);
            this.props.addActiveUser(res.data);
            this.props.history.push('/');
          }
        })
        .catch((err) => {
          console.log('Error posting on login', err);
        });
    }
  }
  render() {
    return (
      <div>
        {this.state.submitEmail ? (
          <div>
            Username :<input type="text" name="username" onChange={e => this.handleInput(e)} />
            {this.state.errorUsername ? <div>username has been taken</div> : <br />}
            Password :<input type="password" name="password" onChange={e => this.handleInput(e)} />
            {this.state.errorPassword ? <div>password must be 6 characters or longer</div> : <br />}
            <br />
            <button onClick={() => this.handleSubmit()}>Submit</button>
          </div>
        ) : (
          <div>
            Email:<br />
            <input name="email" onChange={e => this.handleInput(e)} />
            <button onClick={() => this.setState({ submitEmail: true })}>
              submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    active_user: state.active_user,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addActiveUser,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(SignUp);
