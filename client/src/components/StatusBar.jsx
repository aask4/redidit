import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUp from './SignUp';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addActiveUser, selectUser } from '../actions';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';

class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.selectUserHandler = this.selectUserHandler.bind(this);
  }

  signupClick() {
    console.log('button clicked', this.props.history.push('/signup'));
  }

  logout() {
    const self = this;
    console.log('log out button been clicked');
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('user signOut');
        // Sign-out successful.
        self.props.addActiveUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.log('error sign out', error);
      });
  }

  selectUserHandler(event) {
    this.props.selectUser(this.props.active_user.username);
  }

  render() {
    return (
      <div>
        <div>
          <a href="/">
            <img
              style={{ float: 'left', position: 'relative' }}
              className="logo"
              src="https://i.imgur.com/OX3vXmU.png"
            />
          </a>
<<<<<<< HEAD
        </div>
        <div style={{ float: 'right' }}>
=======
          <h1>REDIDIT</h1>
        <div style={{ float: "right" }}>
>>>>>>> final changes
          {this.props.active_user ? (
            <div>
              <Link to="/userprofile" onClick={this.selectUserHandler}>
                {this.props.active_user.username}
              </Link>
              <button onClick={() => this.logout()}>logout</button>
            </div>
          ) : (
            <div>
              want to join?{' '}
              <a href="" onClick={() => this.signupClick()}>
                <strong>sign up</strong>
              </a>{' '}
              in seconds
            </div>
          )}
        </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    active_user: state.active_user,
    selectedUser: state.selectedUser,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addActiveUser,
      selectUser,
    },
    dispatch,
  );
}
export default connect(mapStateToProps, matchDispatchToProps)(StatusBar);
