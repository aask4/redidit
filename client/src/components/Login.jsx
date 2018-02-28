import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { addActiveUser, loadUserSubredidit } from "../actions";
import firebase from "firebase";
import action from "../firebase";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }
  componentWillMount() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        axios
          .get("/authentication", {
            params: {
              email: JSON.parse(
                window.localStorage[
                  "firebase:authUser:AIzaSyDuOt-BcdopX_8PbPCGz-lsYhhhayBrmLI:[DEFAULT]"
                ]
              ).email
            }
          })
          .then(res => {
            console.log(" this is the data getting back from server", res.data);
            self.props.addActiveUser(res.data);
          })
          .catch(err => {
            console.log("err doing componentwillmount", err);
          });
      } else {
        // No user is signed in.
        console.log("no user login");
      }
    });
  }
  handleLoginButtonClick() {
    console.log("button clicked", this.state);
    let self = this.state;
    axios
      .get("/login", { params: this.state })
      .then(res => {
        console.log(res.data);
        if (res.data.error) {
          this.setState({
            error: res.data.error
          });
        } else {
          action.login(self.email, self.password);
          this.props.addActiveUser(res.data);
          console.log("***** at login", res.data);
          this.props.loadUserSubredidit(res.data.subredidit);
        }
      })
      .catch(err => {
        console.log("Error doing get request on login", err);
      });
    console.log("doing a axios request");
  }
  onchangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div style={{ float: "right" }}>
        <input
          name="email"
          type="text"
          id="username"
          placeholder="Email"
          onChange={e => this.onchangeHandler(e)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={e => this.onchangeHandler(e)}
          required
        />
        <br />
        <div>{this.state.error ? <div>{this.state.error}</div> : null}</div>
        <button
          style={{ float: "right" }}
          onClick={() => this.handleLoginButtonClick()}
        >
          login
        </button>
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
      addActiveUser: addActiveUser,
      loadUserSubredidit: loadUserSubredidit
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
