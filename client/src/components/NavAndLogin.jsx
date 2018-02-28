import React, { Component } from 'react';
import Nav from './Nav.jsx';
import Login from './Login.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addActiveUser } from '../actions';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class NavAndLogin extends Component {
  constructor(props) {
    super(props);
    console.log('NavAndLogin', this.props.history);
  }
  render() {
    return (
      <div className="statusBar">
        <Route path="/" component={Nav} />
        <br />
        {this.props.active_user ? (
          <div />
        ) : (
          <div className="login">
            <Login />
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

export default connect(mapStateToProps, matchDispatchToProps)(NavAndLogin);
