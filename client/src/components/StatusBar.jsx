import React, { Component } from "react";
import { connect } from "react-redux";
import SignUp from "./SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { addActiveUser } from "../actions";
import { bindActionCreators } from "redux";
import firebase from "firebase";
class StatusBar extends Component {
  constructor(props) {
    super(props);
  }
  signupClick() {
    console.log("button clicked", this.props.history.push("/signup"));
  }
  logout() {
    let self = this;
    console.log("log out button been clicked");
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("user signOut");
        // Sign-out successful.
        self.props.addActiveUser(null);
      })
      .catch(function(error) {
        // An error happened.
        console.log("error sign out", error);
      });
  }
  render() {
    return (
      <div>
        <div>
          <a href="/">
            <img
              style={{ float: "left", position: "relative" }}
              className="logo"
              src="https://i.imgur.com/OX3vXmU.png"
            />
          </a>
        </div>
        <div style={{ float: "right" }}>
          {this.props.active_user ? (
            <div>
              {this.props.active_user.username}
              <button onClick={() => this.logout()}>logout</button>
            </div>
          ) : (
            <div>
              want to join?{" "}
              <a href="" onClick={() => this.signupClick()}>
                <strong>sign up</strong>
              </a>{" "}
              in seconds
            </div>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    active_user: state.active_user
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addActiveUser
    },
    dispatch
  );
}
export default connect(mapStateToProps, matchDispatchToProps)(StatusBar);
