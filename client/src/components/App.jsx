import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addname } from '../actions';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Posts from './Posts.jsx';
import Login from './Login.jsx';
import Search from './Search.jsx';
import NavAndLogin from './NavAndLogin';
import Signup from './SignUp.jsx';
import UserProfile from './UserProfile/Profile.jsx';

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <NavAndLogin />
            </Switch>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/posts" component={Posts} />
              <Route path="/userprofile" component={UserProfile} />
              <Route path="/" component={Main} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    test: state.test,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addname,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
