import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import StatusBar from "./StatusBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
class Nav extends Component {
  constructor(props) {
    super(props);
  }
  best() {
    // this.props.history.push('/signup')
  }
  render() {
    return (
      <div>
        <Route path="/" component={StatusBar} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    active_user: state.active_user
  };
}
export default connect(mapStateToProps)(Nav);
