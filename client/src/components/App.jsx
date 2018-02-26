<<<<<<< HEAD
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addname, loadAllSubredidit } from '../actions';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Posts from './Posts.jsx';
import Login from './Login.jsx';
import Search from './Search.jsx';
import NavAndLogin from './NavAndLogin';
import Signup from './SignUp.jsx';
import UserProfile from './UserProfile/Profile.jsx';
import axios from 'axios';

=======
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addname } from "../actions";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./Main";
import Posts from "./Posts.jsx";
import Login from "./Login.jsx";
import Search from "./Search.jsx";
import NavAndLogin from "./NavAndLogin";
import Signup from "./SignUp.jsx";
import UserProfile from "./UserProfile/Profile.jsx";
import firebase from "../firebase";
>>>>>>> added firebase auth
class App extends React.Component {
  constructor() {
    super();
  }
<<<<<<< HEAD

  componentDidMount() {
    axios
      .get('/subredidit')
      .then(({ data }) => {
        console.log('App data is ', data);
        this.props.loadAllSubredidit(data);
      })
      .catch(err => console.log(err));
  }

=======
  firebaseSignup() {
    console.log("button clicked");
    firebase.signup("qiangsong890@yahoo.com", "8891468");
  }
>>>>>>> added firebase auth
  render() {
    return (
      <div>
        <div>
          firebase:
          <button onClick={() => this.firebaseSignup()}>signup</button>
        </div>
        <BrowserRouter>
          <div>
            <Switch>
              <NavAndLogin />
            </Switch>
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/post" component={Posts} />
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
    test: state.test
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
<<<<<<< HEAD
      addname,
      loadAllSubredidit,
=======
      addname
>>>>>>> added firebase auth
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
