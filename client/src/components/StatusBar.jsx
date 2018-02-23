import React, { Component } from "react";
import { connect } from "react-redux";
import SignUp from "./SignUp";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { addActiveUser } from "../actions";
import { bindActionCreators } from "redux";

class StatusBar extends Component {
  constructor(props) {
    super(props);
  }
  signupClick() {
    console.log("button clicked", this.props.history.push("/signup"));
  }
  render() {
    return (
      <div style={{ float: "right" }}>
        {this.props.active_user ? (
          <div>
            {this.props.active_user.username}
            <button onClick={() => this.props.addActiveUser(null)}>
              logout
            </button>
          </div>
        ) : (
          <div>
            wants to join in ?{" "}
            <span onClick={() => this.signupClick()}>
              <strong>sign up</strong>
            </span>{" "}
            in a seconds
          </div>
        )}
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
      addActiveUser: addActiveUser
    },
    dispatch
  );
}
export default connect(mapStateToProps, matchDispatchToProps)(StatusBar);
